const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const movieRouter = require("./routes/movies.routes");
const usersRoutes = require("./routes/users.routes");

const swaggerUI = require("swagger-ui-express");
const apiDocs = require("./swagger.json");

const PORT = process.env.PORT || 8081;

dotenv.config();

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocs));
app.use(morgan("dev"));
app.use(express.json());

app.use(movieRouter);
app.use(usersRoutes);

app.get("/ping", (req, res) => {
  res.json({ message: "PING SUCCESS" });
});

app.listen(PORT, () => {
  console.log(`APPLICATIN RUNNING in http://localhost:${PORT}`);
});
