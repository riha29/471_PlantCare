const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.info(`MongoDB Connected: ${conn.connection.host}`);

    // Monitor MongoDB connection events
    mongoose.connection.on('connected', () => console.info('Mongoose connected to DB'));
    mongoose.connection.on('error', (err) => console.error(`Mongoose connection error: ${err}`));
    mongoose.connection.on('disconnected', () => console.info('Mongoose disconnected from DB'));
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
