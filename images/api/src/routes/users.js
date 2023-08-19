const express = require("express");
const router = express.Router();
const knex = require("../db/db");

/**
 * @route POST /users
 * @group Users - User operations
 * @param {string} username.body.required - username of the user
 * @param {string} password.body.required - password of the user
 * @returns {object} 201 - Newly created user object
 * @returns {object} 500 - Error message
 */
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await knex("users").insert({ username, password });
    console.log(`User with the name "${username}" created.`);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(`Error creating user "${username}":`, error.message);
    res.status(500).json({ message: "Error creating user", error });
  }
});

/**
 * @route GET /users
 * @group Users - User operations
 * @returns {Array.<object>} 200 - Array of user objects
 * @returns {object} 500 - Error message
 */
router.get("/", async (req, res) => {
  try {
    const users = await knex("users").select();
    console.log("Retrieved all users.");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error.message);
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

/**
 * @route GET /users/{id}
 * @group Users - User operations
 * @param {number} id.path.required - ID of the user to retrieve
 * @returns {object} 200 - User object
 * @returns {object} 404 - User not found message
 * @returns {object} 500 - Error message
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await knex("users").where("id", req.params.id).first();
    if (user) {
      console.log(`Retrieved user with ID: ${req.params.id}`);
      res.status(200).json(user);
    } else {
      console.log(`User with ID: ${req.params.id} not found.`);
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(
      `Error retrieving user with ID: ${req.params.id}`,
      error.message
    );
    res.status(500).json({ message: "Error retrieving user", error });
  }
});

/**
 * @route PUT /users/{id}
 * @group Users - User operations
 * @param {number} id.path.required - ID of the user to update
 * @param {string} username.body - New username of the user
 * @param {string} password.body - New password of the user
 * @returns {object} 200 - User updated message
 * @returns {object} 500 - Error message
 */
router.put("/:id", async (req, res) => {
  try {
    const { username, password } = req.body;
    await knex("users")
      .where("id", req.params.id)
      .update({ username, password });
    console.log(`User with ID: ${req.params.id} updated.`);
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.error(
      `Error updating user with ID: ${req.params.id}`,
      error.message
    );
    res.status(500).json({ message: "Error updating user", error });
  }
});

/**
 * @route DELETE /users/{id}
 * @group Users - User operations
 * @param {number} id.path.required - ID of the user to delete
 * @returns {object} 200 - User deleted message
 * @returns {object} 500 - Error message
 */
router.delete("/:id", async (req, res) => {
  try {
    await knex("users").where("id", req.params.id).del();
    console.log(`User with ID: ${req.params.id} deleted.`);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(
      `Error deleting user with ID: ${req.params.id}`,
      error.message
    );
    res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = router;
