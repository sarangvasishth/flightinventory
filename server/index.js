require("colors");
require("dotenv").config();

const hpp = require("hpp");
const express = require("express");
const xss = require("xss-clean");
const logger = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("../config/db");
const errorHandler = require("../middlewares/error");
const asyncHandler = require("../middlewares/async");

const Product = require("../server/models/Product");

const { DEVELOPMENT } = require("../src/constants");

connectDB();
const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// api security measures
app.use(hpp());
app.use(xss());
app.use(helmet());
app.use(limiter);
app.use(mongoSanitize());

// dev logging middleware
if (process.env.NODE_ENV === DEVELOPMENT) {
  app.use(logger("dev"));
}

app.get(
  "/product",
  asyncHandler(async (req, res, next) => {
    const { search, sort, page } = req.params;

    const pipeline = [];
    if (search) {
      pipeline.push({
        $or: [
          { slug: { $regex: search, $options: "i" } },
          { type: { $regex: search, $options: "i" } },
          { cuisine: { $regex: search, $options: "i" } },
        ],
      });
    }
    if (sort) {
      pipeline.push({
        $or: [
          { slug: { $regex: search, $options: "i" } },
          { type: { $regex: search, $options: "i" } },
          { cuisine: { $regex: search, $options: "i" } },
        ],
      });
    }

    const items = await Product.find();
    return res.status(200).json({
      success: true,
      data: items,
    });
  })
);

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