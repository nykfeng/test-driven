const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");

TodoModel.create = jest.fn(); // Mock functions allow you to test the links between code by erasing the actual implementation of a function, capturing calls to the function

let req, res, next;
beforeEach(()=> {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
})

describe("ToDoController.createTodo", () => {
  beforeEach(()=> {
    req.body = newTodo;
  })

  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });

  // Now to check if this create function can be called
  it("should call ToDoModel.create", () => {
    // Run this function
    // TodoController.createTodo();
    // Then expect
    // expect(TodoModel.create).toBeCalled();
  });

  // now to pass in argument to test
  it("should call ToDoModel.create with arguments", () => {
  
    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it("shoudl return 201 response code", async ()=> {
    req.body = newTodo;
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();// expect the response to be sent
  })

  it ("should return json body in response", async ()=> {
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);

  })
});
