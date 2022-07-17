const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test-driven-development");
  } catch (err) {
    console.log(err);
    console.log("Error encountered connecting to MongoDB");
  }
}


module.exports = { connect };