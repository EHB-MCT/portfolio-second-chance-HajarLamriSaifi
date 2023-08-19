const express = require("express");
const bodyParser = require("body-parser");
const checkDatabaseConnection = require("./db/dbCheck");
const userRoutes = require("./routes/users");
const quoteRoutes = require("./routes/quotes"); 

const PORT = process.env.PORT || 3000;
const app = express();

// Check the database connection when starting the app
checkDatabaseConnection();

// Use bodyParser middleware to parse incoming JSON requests
app.use(bodyParser.json());

/**
 * @route GET /
 * @group Main - Main route of the server
 * @returns {object} 200 - Returns a welcome message
 */
app.get("/", (request, response) => {
  response.send({ message: "Hello world" });
});

// Use the userRoutes for all routes starting with /users
app.use("/users", userRoutes);

// Use the quoteRoutes for all routes starting with /quotes
app.use("/quotes", quoteRoutes);

// Start the server only if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
