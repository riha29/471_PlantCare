const mongoose = require('mongoose');
const logger = require('./logger'); // Assuming you have a logger setup

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    logger.info(`MongoDB Connected: ${conn.connection.host}`);

    // Monitor MongoDB connection events
    mongoose.connection.on('connected', () => logger.info('Mongoose connected to DB'));
    mongoose.connection.on('error', (err) => logger.error(`Mongoose connection error: ${err}`));
    mongoose.connection.on('disconnected', () => logger.info('Mongoose disconnected from DB'));
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
