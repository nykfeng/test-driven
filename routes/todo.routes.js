const express = require("express");
const toDoController = require("../controllers/todo.controller");
const router = express.Router();

router.post("/", toDoController.createTodo);
router.get("/", toDoController.getTodos);
router.get("/:todoId", toDoController.getTodoById);

module.exports = router;
