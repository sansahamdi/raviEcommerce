const express = require("express");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/errors");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Import all routes
const products = require("./routes/product");
const authUser = require("./routes/auth");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", authUser);
app.use("/api/v1", order);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
