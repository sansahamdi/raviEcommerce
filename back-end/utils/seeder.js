const Product = require("../models/Product");
const dotenv = require("dotenv");
const connectDataBase = require("../config/database");

const product = require("../data/product");

// Setting dotenv file
dotenv.config({ path: "back-end/config/config.env" });

connectDataBase();

const seedProduct = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(product);
    console.log("All products are added");

    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};

seedProduct();
