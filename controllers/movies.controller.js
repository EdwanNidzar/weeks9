const models = require("../models");
const Movie = models.Movie;
const { paginate } = require("./middleware");

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.findAll();

    const paginatedData = paginate(
      movies,
      req.pagination.page,
      req.pagination.limit
    );

    res.json(paginatedData);
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({ message: "success created movie", data: movie });
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.update(req.body, { where: { id } });

    if (updatedMovie[0] === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "success updated movie" });
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.destroy({ where: { id } });

    if (deletedMovie === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "success deleted movie" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllMovies, createMovie, updateMovie, deleteMovie };
