const supertest = require("supertest");
const app = require("../index");

const request = supertest(app);

/**
 * Test suite for User routes
 * @module tests/userRoutes
 */

/**
 * Test suite for creating a user
 */
describe("POST /user", () => {
  /**
   * Test that verifies a user can be successfully created.
   */
  test("should respond with code 200", async () => {
    const response = await request.post("/user").send({
      username: "username",
      password: "password",
    });
    expect(response.statusCode).toBe(200);
  });
});

/**
 * Test suite for fetching users
 */
describe("GET /user", () => {
  /**
   * Test that verifies the route responds with a 200 status code.
   */
  test("should respond with code 200", async () => {
    const response = await request.get("/user");
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that verifies the response contains an array (list of users).
   */
  test("should return an array", async () => {
    const response = await request.get("/user");
    expect(Array.isArray(response.body)).toBe(true);
  });
});

/**
 * Test suite for updating a user
 */
describe("PUT /user/:id", () => {
  /**
   * Test that verifies an existing user can be successfully updated.
   */
  test("should respond with code 200 when updating an existing user", async () => {
    const createUserResponse = await request.post("/user").send({
      id: "1",
      username: "username",
      password: "password",
    });

    const response = await request.put("/user/1").send({
      id: "1",
      username: "username",
      password: "updatedPassword",
    });

    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that verifies the behavior when trying to update a user that doesn't exist.
   */
  test("should respond with code 404 when trying to update a non-existent user", async () => {
    const response = await request.put("/user/999").send({
      username: "username",
      password: "updatedPassword",
    });

    expect(response.statusCode).toBe(404);
  });
});

/**
 * Test suite for deleting a user
 */
describe("DELETE /user/:id", () => {
  /**
   * Test that verifies an existing user can be successfully deleted.
   */
  test("should respond with code 200 when deleting an existing user", async () => {
    const createUserResponse = await request.post("/user").send({
      id: "2",
      username: "username",
      password: "password",
    });

    const response = await request.delete("/user/2");
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that verifies the behavior when trying to delete a user that doesn't exist.
   */
  test("should respond with code 404 when trying to delete a non-existent user", async () => {
    const response = await request.delete("/user/999");
    expect(response.statusCode).toBe(404);
  });
});
