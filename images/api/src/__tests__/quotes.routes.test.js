const supertest = require("supertest");
const app = require("../index");

const request = supertest(app);

/**
 * Test suite for Quote routes
 * @module tests/quoteRoutes
 */

let userId;  // To store the dynamically created user's ID

/**
 * Test suite for creating a quote
 */
describe("POST /quotes", () => {
  /**
   * Create a user before running the quote tests.
   */
  beforeAll(async () => {
    const userResponse = await request.post("/user").send({
      username: "testUser",
      password: "testPassword",
    });
    userId = userResponse.body.id;
  });

  /**
   * Test that verifies a quote can be successfully created.
   */
  test("should respond with code 200", async () => {
    const response = await request.post("/quotes").send({
      quote: "A sample quote",
      user_id: userId  // Use the dynamically created user's ID
    });
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test suite for fetching quotes
   */
  describe("GET /quotes", () => {
    /**
     * Test that verifies the route responds with a 200 status code.
     */
    test("should respond with code 200", async () => {
      const response = await request.get("/quotes");
      expect(response.statusCode).toBe(200);
    });

    /**
     * Test that verifies the response contains an array (list of quotes).
     */
    test("should return an array", async () => {
      const response = await request.get("/quotes");
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  /**
   * Test suite for updating a quote
   */
  describe("PUT /quotes/:id", () => {
    /**
     * Test that verifies an existing quote can be successfully updated.
     */
    test("should respond with code 200 when updating an existing quote", async () => {
      const createQuoteResponse = await request.post("/quotes").send({
        quote: "Initial quote",
        user_id: userId
      });

      const response = await request.put(`/quotes/${createQuoteResponse.body.id}`).send({
        quote: "Updated quote"
      });

      expect(response.statusCode).toBe(200);
    });

    /**
     * Test that verifies the behavior when trying to update a quote that doesn't exist.
     */
    test("should respond with code 404 when trying to update a non-existent quote", async () => {
      const response = await request.put("/quotes/999").send({
        quote: "Some quote"
      });

      expect(response.statusCode).toBe(404);
    });
  });

  /**
   * Test suite for deleting a quote
   */
  describe("DELETE /quotes/:id", () => {
    /**
     * Test that verifies an existing quote can be successfully deleted.
     */
    test("should respond with code 200 when deleting an existing quote", async () => {
      const createQuoteResponse = await request.post("/quotes").send({
        quote: "Another sample quote",
        user_id: userId
      });

      const response = await request.delete(`/quotes/${createQuoteResponse.body.id}`);
      expect(response.statusCode).toBe(200);
    });

    /**
     * Test that verifies the behavior when trying to delete a quote that doesn't exist.
     */
    test("should respond with code 404 when trying to delete a non-existent quote", async () => {
      const response = await request.delete("/quotes/999");
      expect(response.statusCode).toBe(404);
    });
  });

  /**
   * Cleanup after all tests are done.
   */
  afterAll(async () => {
    // Optionally, delete the test user to clean up the database
    await request.delete(`/user/${userId}`);
  });
});
