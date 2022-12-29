/** @format */

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

// middle ware
app.use(cors());
app.use(express.json());

// requiring dot env
// require("dotenv").config();
app.get("/", async (req, res) => {
  res.send("My task management project is running successfully");
});
app.listen(port, async (req, res) => {
  console.log(`Server is running at port : ${port}`);
});
