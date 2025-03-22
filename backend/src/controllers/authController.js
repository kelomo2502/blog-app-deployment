// src/controllers/authController.js
const User = require('../models/User');
const { signToken } = require('../utils/jwt');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, image } = req.body;
    const user = new User({ username, email, password, image });
    await user.save();
    const token = signToken({ id: user._id });
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, username: user.username, email: user.email, image: user.image },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = signToken({ id: user._id });
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email, image: user.image },
    });
  } catch (err) {
    next(err);
  }
};
