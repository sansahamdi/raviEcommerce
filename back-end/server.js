const app = require("./app");
const connectDataBase = require("./config/database");

const dotenv = require("dotenv");

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

// Setting up config file
dotenv.config({ path: "back-end/config/config.env" });

connectDataBase();

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
