// models/user.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true // Name is required
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true // Email must be unique
    },
    photo: {
      type: String,
      default: "" // Default to empty string if no photo is provided
    },
    password: {
      type: String,
      required: true // Password is required
    },
    sharedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post" // Reference to Post model
      }
    ],
    preferences: {
      eventNotifications: {type: Boolean, default: true},
      featureUpdates: {type: Boolean, default: true}
    }
  },
  {
    timestamps: true // Automatically add createdAt and updatedAt fields
  }
);

// Pre-save Hook: Hash the password before saving the user document
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error); // Pass the error to the next middleware
  }
});

// Instance Method: Compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
