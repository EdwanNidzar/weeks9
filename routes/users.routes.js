const express = require("express");
const { getAllUsers } = require("../controllers/users.controller");
const { paginationMiddleware } = require("../controllers/middleware");
const { loginUser } = require("../controllers/login.controller");
const { registerUser } = require("../controllers/register.controller");
const userRouter = express.Router();

userRouter.get("/api/users", paginationMiddleware, getAllUsers);
userRouter.post("/api/login", loginUser);
userRouter.post("/api/register", registerUser);

module.exports = userRouter;
