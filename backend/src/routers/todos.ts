import express from "express";

const router = express.Router();

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

// Temporary in-memory store (replace with a database later)
let todos: TodoItem[] = [];

router.get("/", (req, res) => {
  res.json(todos);
});

router.post("/", (req, res) => {
  const { text } = req.body;
  const newTodo: TodoItem = {
    id: Date.now(),
    text,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const todo = todos.find((t) => t.id === parseInt(id));
  if (todo) {
    todo.completed = completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});

export default router;
