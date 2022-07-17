const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

let firstTodo, newTodoId;
const testData = { title: "Testing PUT for integration", done: true };

describe(endpointUrl, () => {
  it("POST" + endpointUrl, async () => {
    // If you see 5000 ms timeout error, chec if mongoDB has started up
    const response = await request(app).post(endpointUrl).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
    newTodoId = response.body._id;
  });

  it(
    "should return error 500 on invalid data with POST request" + endpointUrl,
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({ title: "Missing done property" });
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: "Todo validation failed: done: Path `done` is required.",
      });
    }
  );

  test("GET" + endpointUrl, async () => {
    // If you see 5000 ms timeout error, make sure mongoDB has started up
    const response = await request(app).get(endpointUrl);

    expect(response.statusCode).toBe(200);
    // expect(typeof response.body).toBe('array');

    // the json response object should contain an array of todo objects
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });

  // test when the item's id exists
  test("GET by Id " + endpointUrl + ":todoId", async () => {
    const response = await request(app).get(endpointUrl + firstTodo._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });

  // test when the id does not exist
  test("GET todoby Id doesn't exist" + endpointUrl + ":todoId", async () => {
    const response = await request(app).get(
      endpointUrl + "62d36912373a04990a8320e2"
    );
    expect(response.statusCode).toBe(404);
  });

  // PUT integration
  it("PUT" + endpointUrl, async () => {
    
    const res = await request(app)
      .put(endpointUrl + newTodoId)
      .send(testData);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  });

  // DELETE integration
  test("HTTP DELETE", async()=> {
    const res = await request(app).delete(endpointUrl + newTodoId).send();
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);

  })

  test("HTTP DELETE 404", async () => {
    const nonExistingTodoId = "62d36912373a04990a8320e2"
    const res = await request(app).delete(endpointUrl + nonExistingTodoId).send();
    expect(res.statusCode).toBe(404);
  })
});
