const { Router } = require("express");
const ToDo = require("../models/todo");
const router = Router();

router.get("/", (req, res) => {
  const title = "Home";
  res.render("index", {
    title,
    isIndex: true,
  });
});

router.get("/create", (req, res) => {
  const title = "Create task";
  res.render("create", {
    title,
    isCreate: true,
  });
});

router.get("/tasks", async (req, res) => {
  const todos = await ToDo.find({}).lean();
  const title = "Tasks";
  res.render("tasks", {
    title,
    isTasks: true,
    todos,
  });
});

router.post("/create", async (req, res) => {
  const todo = new ToDo({
    title: req.body.title,
  });
  await todo.save();
  res.redirect("/tasks");
});

router.post("/complete", async (req, res) => {
  const todo = await ToDo.findById(req.body.id);

  todo.completed = !!req.body.completed;
  await todo.save();
  res.redirect("/tasks");
});

module.exports = router;
