const express = require("express");
const checkDatabaseConnection = require("./db/dbCheck");

const PORT = process.env.PORT || 3000;

const app = express();

// Database connection check
checkDatabaseConnection();

// Routes
app.get("/", (request, response) => {
  response.send({ message: "Hello world" });
});

// Server startup
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server running on port ${PORT}`);
  } else {
    console.error("Error starting server:", err);
  }
});
