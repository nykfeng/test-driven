const express = require("express");
const toDoController = require("../controllers/todo.controller")
const router = express.Router();

router.post("/", toDoController.createTodo);

module.exports = router;