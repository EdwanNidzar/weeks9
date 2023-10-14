const models = require("../models");
const User = models.User;
const { paginate } = require("./middleware");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    const paginatedData = paginate(
      users,
      req.pagination.page,
      req.pagination.limit
    );

    res.json(paginatedData);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers };
