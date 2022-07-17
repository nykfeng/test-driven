const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const { default: mongoose } = require("mongoose");
const mongodb = require("./mongodb/mongodb.connect");
const app = express();

mongodb.connect();
app.use(express.json());

app.use("/todos", todoRoutes);

// Express error handling
app.use((error, req, res, next) => {
//   console.log(error);
  res.status(500).json({ message: error.message });
});

app.get("/", (req, res) => {
  res.json("Hi mom");
});

module.exports = app;
