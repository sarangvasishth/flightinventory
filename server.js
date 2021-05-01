require("colors");
require("dotenv").config();

const express = require("express");
const logger = require("morgan");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");
const ErrorResponse = require("./utils/errorResponse");

const { DEVELOPMENT } = require("./src/constants");

connectDB();
const app = express();

// dev logging middleware
if (process.env.NODE_ENV === DEVELOPMENT) {
  app.use(logger("dev"));
}

app.get("/", function (req, res, next) {
  return res.send("Hello World");
});

app.use(function (req, res, next) {
  res.status(404);
  res.send("404: Not Found!");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Example app listening at Port: ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejection
process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`.red.bold);
});
