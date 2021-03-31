const app = require("./app");
const connectDataBase = require("./config/database");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

// Setting up config file
dotenv.config({ path: "back-end/config/config.env" });

connectDataBase();

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is runing on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.stack}`);
  console.log("Shutting down the server due the unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
