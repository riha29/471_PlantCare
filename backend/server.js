const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const plantRoutes = require("./routes/plantRoutes");
const marketplaceRoutes = require("./routes/marketPlaceRoutes");
const productRoutes = require("./routes/productRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const postRoutes = require("./routes/postRoutes");
const Plant = require("./models/plant");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();
const app = express();

app.use(morgan("dev"));
// Middleware
app.use(
  cors({
    origin: "http://localhost:3000" || "https://plant-final-front.onrender.com",
    credentials: true
  })
);
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/users", userRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/", transactionRoutes);
app.use("/api/posts", postRoutes);

// Schedule the task to run daily at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const today = new Date();

    // Fetch all plants
    const plants = await Plant.find();

    // Iterate over each plant and check notifications
    const notifications = [];
    plants.forEach((plant) => {
      const {
        name,
        userId,
        lastWatered,
        lastFertilized,
        lastPruned,
        waterInterval,
        fertilizeInterval,
        pruneInterval
      } = plant;

      const userNotification = {userId, plant: name, messages: []};

      // Check watering schedule
      if (lastWatered) {
        const nextWatering = new Date(lastWatered);
        nextWatering.setDate(nextWatering.getDate() + waterInterval);
        if (today >= nextWatering) {
          userNotification.messages.push(`Time to water your plant "${name}".`);
        }
      }

      // Check fertilizing schedule
      if (lastFertilized) {
        const nextFertilizing = new Date(lastFertilized);
        nextFertilizing.setDate(nextFertilizing.getDate() + fertilizeInterval);
        if (today >= nextFertilizing) {
          userNotification.messages.push(
            `Time to fertilize your plant "${name}".`
          );
        }
      }

      // Check pruning schedule
      if (lastPruned) {
        const nextPruning = new Date(lastPruned);
        nextPruning.setDate(nextPruning.getDate() + pruneInterval);
        if (today >= nextPruning) {
          userNotification.messages.push(`Time to prune your plant "${name}".`);
        }
      }

      if (userNotification.messages.length > 0) {
        notifications.push(userNotification);
      }
    });

    // Send notifications to users (store in a collection, email, or frontend)
    console.log("Generated Notifications:", notifications);
  } catch (error) {
    console.error("Error generating notifications:", error.message);
  }
});

// Start server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
