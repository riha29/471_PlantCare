const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const plantRoutes = require('./routes/plantRoutes');
const marketplaceRoutes = require("./routes/marketPlaceRoutes");
const productRoutes = require("./routes/productRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes")


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/users', userRoutes);
app.use('/api/plants', plantRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);


// Start server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
