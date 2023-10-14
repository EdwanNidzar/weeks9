const jwt = require("jsonwebtoken");

const paginate = (items, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const paginatedItems = items.slice(offset, offset + limit);

  return {
    data: paginatedItems,
    totalItems: items.length,
    currentPage: page,
    totalPages: Math.ceil(items.length / limit),
  };
};

const paginationMiddleware = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  req.pagination = {
    page,
    limit,
  };

  next();
};

const validateMovieFields = (req, res, next) => {
  const { title, genres, year } = req.body;

  if (!title || !genres || !year) {
    return res.status(400).json({ message: "Semua properti harus diisi." });
  }
  next();
};

const verifyToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token is missing" });
  }

  jwt.verify(token, "rahasiakunci", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = {
  paginate,
  paginationMiddleware,
  validateMovieFields,
  verifyToken,
};
