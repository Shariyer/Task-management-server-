/** @format */

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

// middle ware
app.use(cors());
app.use(express.json());

// requiring dot env
require("dotenv").config();

// database connection

const { MongoClient, ServerApiVersion } = require("mongodb");
const { all } = require("express/lib/application");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dhtiicz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const taskCollection = client
    .db("TaskManagementDB")
    .collection("taskCollection");

  app.get("/tasks", async (req, res) => {
    const query = {};
    const allTasks = await taskCollection.find(query);
    res.send(allTasks);
  });
}
run().catch((err) => console.log(err));
run.app.get("/", async (req, res) => {
  res.send("My task management project is running successfully");
});
app.listen(port, async (req, res) => {
  console.log(`Server is running at port : ${port}`);
});
