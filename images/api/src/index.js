const express = require("express");
const checkDatabaseConnection = require("./db/dbCheck");

const PORT = process.env.PORT || 3000;

const app = express();

// Database connection check
checkDatabaseConnection();

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.get("/", (request, response) => {
  response.send({ message: "Hello world" });
});

let mockUsers = [];

app.post("/user", (req, res) => {
  const user = req.body;
  mockUsers.push(user);
  res.status(200).send();
});

app.get("/user", (req, res) => {
  res.json(mockUsers);
});

app.put("/user/:id", (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;

  const userIndex = mockUsers.findIndex((user) => user.id === id);
  if (userIndex > -1) {
    mockUsers[userIndex] = updatedUser;
    res.status(200).send();
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

app.delete("/user/:id", (req, res) => {
  const id = req.params.id;

  const userIndex = mockUsers.findIndex((user) => user.id === id);
  if (userIndex > -1) {
    mockUsers.splice(userIndex, 1);
    res.status(200).send();
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

// Start the server if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

module.exports = app;
