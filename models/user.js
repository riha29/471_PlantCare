// backend/models/User.js
const { Schema, model } = require('mongoose');
const { genSalt, hash, bcrypt, compare } = require('bcryptjs');

// User Schema
const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Encrypt password before saving to DB
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

// Compare entered password with the stored hash
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await compare(enteredPassword, this.password);
};

const User = model('user', userSchema);
module.exports=  User;
