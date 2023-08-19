const express = require("express");
const bodyParser = require("body-parser");
const checkDatabaseConnection = require("./db/dbCheck");
const userRoutes = require("./routes/users");

const PORT = process.env.PORT || 3000;
const app = express();

checkDatabaseConnection();
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.send({ message: "Hello world" });
});

app.use("/users", userRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
