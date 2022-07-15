const TodoController = require("../../controllers/todo.controller");
const TodoModel = require('../../model/todo.model');

TodoModel.create = jest.fn(); // Mock functions allow you to test the links between code by erasing the actual implementation of a function, capturing calls to the function 

describe("ToDoController.createTodo", () => {
  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });

  // Now to check if this create function can be called
  it('should call ToDoModel.create', ()=> {
    // Run this function
    TodoController.createTodo();
    // Then expect 
    expect(TodoModel.create).toBeCalled();
  })
});
