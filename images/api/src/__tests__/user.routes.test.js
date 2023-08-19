const supertest = require("supertest");
const app = require("../index");

const request = supertest(app);

describe("POST /user", () => {
  test("should respond with code 200", async () => {
    const response = await request.post("/user").send({
      username: "username",
      password: "password",
    });
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /user", () => {
  test("should respond with code 200", async () => {
    const response = await request.get("/user");
    expect(response.statusCode).toBe(200);
  });

  test("should return an array", async () => {
    const response = await request.get("/user");
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("PUT /user/:id", () => {
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

  test("should respond with code 404 when trying to update a non-existent user", async () => {
    const response = await request.put("/user/999").send({
      username: "username",
      password: "updatedPassword",
    });

    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /user/:id", () => {
  test("should respond with code 200 when deleting an existing user", async () => {
    const createUserResponse = await request.post("/user").send({
      id: "2",
      username: "username",
      password: "password",
    });

    const response = await request.delete("/user/2");
    expect(response.statusCode).toBe(200);
  });

  test("should respond with code 404 when trying to delete a non-existent user", async () => {
    const response = await request.delete("/user/999");
    expect(response.statusCode).toBe(404);
  });
});
