const { User } = require("../models");

const registerUser = async (req, res, next) => {
  try {
    const { email, password, gender, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const newUser = await User.create({
      email,
      password,
      gender,
      role,
    });

    res.json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser };
