require("colors");
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const Product = require("./server/models/Product");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const products = JSON.parse(
  fs.readFileSync(path.join("src", "data", "MOCK_DATA.json"), "utf-8")
);

const createCollection = async () => {
  try {
    await Product.create(products);
    console.log("Data Imported...".green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createCollection();
