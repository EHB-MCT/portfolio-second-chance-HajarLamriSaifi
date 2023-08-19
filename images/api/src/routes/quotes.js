const express = require("express");
const router = express.Router();
const knex = require("../db/db");

/**
 * @route POST /quotes
 * @group Quotes - Quote operations
 * @param {string} quote.body.required - The quote text
 * @param {number} user_id.body.required - ID of the associated user
 * @returns {object} 201 - Newly created quote object
 * @returns {object} 500 - Error message
 */
router.post("/", async (req, res) => {
  try {
    const { quote, user_id } = req.body;
    const newQuote = await knex("quotes").insert({ quote, user_id });
    console.log(`Quote added: "${quote}"`);
    res.status(201).json(newQuote);
  } catch (error) {
    console.error(`Error creating quote:`, error.message);
    res.status(500).json({ message: "Error creating quote", error });
  }
});

/**
 * @route GET /quotes
 * @group Quotes - Quote operations
 * @returns {Array.<object>} 200 - Array of quote objects
 * @returns {object} 500 - Error message
 */
router.get("/", async (req, res) => {
  try {
    const quotes = await knex("quotes").select();
    console.log("Retrieved all quotes.");
    res.status(200).json(quotes);
  } catch (error) {
    console.error("Error retrieving quotes:", error.message);
    res.status(500).json({ message: "Error retrieving quotes", error });
  }
});

/**
 * @route PUT /quotes/{id}
 * @group Quotes - Quote operations
 * @param {number} id.path.required - ID of the quote to update
 * @param {string} quote.body - New quote text
 * @returns {object} 200 - Quote updated message
 * @returns {object} 500 - Error message
 */
router.put("/:id", async (req, res) => {
  try {
    const { quote } = req.body;
    await knex("quotes").where("id", req.params.id).update({ quote });
    console.log(`Quote with ID ${req.params.id} updated.`);
    res.status(200).json({ message: "Quote updated" });
  } catch (error) {
    console.error(
      `Error updating quote with ID ${req.params.id}:`,
      error.message
    );
    res.status(500).json({ message: "Error updating quote", error });
  }
});

/**
 * @route DELETE /quotes/{id}
 * @group Quotes - Quote operations
 * @param {number} id.path.required - ID of the quote to delete
 * @returns {object} 200 - Quote deleted message
 * @returns {object} 500 - Error message
 */
router.delete("/:id", async (req, res) => {
  try {
    await knex("quotes").where("id", req.params.id).del();
    console.log(`Quote with ID ${req.params.id} deleted.`);
    res.status(200).json({ message: "Quote deleted" });
  } catch (error) {
    console.error(
      `Error deleting quote with ID ${req.params.id}:`,
      error.message
    );
    res.status(500).json({ message: "Error deleting quote", error });
  }
});

module.exports = router;
