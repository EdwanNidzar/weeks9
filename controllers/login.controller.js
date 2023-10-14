const jwt = require("jsonwebtoken"); // Impor jwt

const models = require("../models");
const User = models.User;

const generateToken = (user) => {
  const secretKey = "rahasiakunci";
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

  return token;
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await User.findOne({ where: { password } });
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user); // Hasilkan token

    res.json({ message: "Login successful.", token });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser };
