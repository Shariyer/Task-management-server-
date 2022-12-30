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

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { all } = require("express/lib/application");
const uri = `mongodb+srv://TaskManagementDB:Y9JtktP1TlwCNo9l@cluster0.dhtiicz.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
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
    const allTasks = await taskCollection.find(query).toArray();
    res.send(allTasks);
  });
  // update
  app.put("/tasks/:id", async (req, res) => {
    const updatedTask = req.body;
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const option = { upsert: true };
    const updatedDoc = {
      $set: {
        taskDescription: updatedTask.taskDescription,
      },
    };
    const result = await taskCollection.updateOne(filter, updatedDoc, option);
    res.send(result);
  });
  app.delete("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const result = await taskCollection.deleteOne(filter);
    res.send(result);
  });
  app.post("/tasks", async (req, res) => {
    const task = req.body;
    console.log("inside", task);
    const result = await taskCollection.insertOne(task);
    res.send(result);
  });
}
run().catch((err) => console.log(err));
app.get("/", async (req, res) => {
  res.send("My task management project is running successfully");
});
app.listen(port, async (req, res) => {
  console.log(`Server is running at port : ${port}`);
});
