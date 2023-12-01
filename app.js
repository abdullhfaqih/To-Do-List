// all modules
import express from "express";
import expressLayouts from "express-ejs-layouts";
import methodOverride from "method-override";

// DB connection & Schema
import { connectDB } from "./db/connection.js";
import { Todo } from "./db/todo.js";

// connecting to DB
connectDB().then(() => {
  console.log("MongoDB Connected");
});

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

// setup method-verride
app.use(methodOverride("_method"));

// use ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

app.get("/", (req, res) => {
  res.render("home", {
    title: "To Do List Best",
    layout: "layouts/main-layout",
  });
});

app.get("/todo-list", async (req, res) => {
  const lists = await Todo.find();

  res.render("add-todo-list", {
    title: "To Do List Best",
    layout: "layouts/main-layout",
    lists,
  });
});

// process of adding data
app.post("/todo-list", async (req, res) => {
  await Todo.insertMany(req.body);
  res.redirect("/todo-list");
});

app.get("/todo-list/edit/:_id", async (req, res) => {
  const lists = await Todo.find();
  const { _id, todo } = await Todo.findOne({ _id: req.params._id });

  res.render("edit", {
    title: "edit page",
    layout: "layouts/main-layout",
    lists,
    todo,
    _id,
  });
});

// process of editing data
app.put("/todo-list", async (req, res) => {
  const { todo } = req.body;

  await Todo.updateOne(
    { _id: req.body._id },
    {
      $set: {
        todo,
      },
    }
  );
  res.redirect("/todo-list");
});

// process of deleting data
app.delete("/todo-list", async (req, res) => {
  await Todo.deleteOne({ _id: req.body });
  res.redirect("/todo-list");
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>page is not found</h1>");
});

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
