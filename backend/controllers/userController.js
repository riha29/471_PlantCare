const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    ger.error(`Error creating user: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = createUser;