const express = require("express");
const {
  getAllMovies,
  createMovie,
  deleteMovie,
  updateMovie,
} = require("../controllers/movies.controller");
const {
  paginationMiddleware,
  validateMovieFields,
  verifyToken,
} = require("../controllers/middleware");
const movieRouter = express.Router();

movieRouter.get("/api/movies", verifyToken, paginationMiddleware, getAllMovies);
movieRouter.post("/api/movies", verifyToken, validateMovieFields, createMovie);
movieRouter.put(
  "/api/movies/:id",
  verifyToken,
  validateMovieFields,
  updateMovie
);
movieRouter.delete("/api/movies/:id", verifyToken, deleteMovie);

module.exports = movieRouter;
