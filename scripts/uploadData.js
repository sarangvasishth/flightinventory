require("dotenv").config();
const fs = require("fs");
const util = require("util");
const slugify = require("slugify");
const MongoClient = require("mongodb").MongoClient;

const readFile = util.promisify(fs.readFile);

const createCollection = async () => {
  try {
    const data = await readFile("src/data/MOCK_DATA.json", "utf8");

    const jsonData = JSON.parse(data);

    for (let i = 0; i < jsonData.length; i++) {
      jsonData[i]["slug"] = slugify(jsonData[i].name, { lower: true });
    }
    console.log(process.env.MONGODB_URI);
    const db = await MongoClient.connect(process.env.MONGODB_URI);
    const dbase = db.db(process.env.DATABASE_NAME);
    await dbase.collection("products").insertMany(jsonData);

    db.close();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createCollection();
