const express = require("express");

const auth = require("../middleware/auth");

const { registerUser, loginUser } = require("../controllers/userController");

const {
  home,
  createTodo,
  getTodo,
  editTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// todo routes
router.get("/", home);
router.post("/createTodo", auth, createTodo);
router.get("/getTodo", auth, getTodo);
router.put("/editTodo/:id", auth, editTodo);
router.delete("/deleteTodo/:id", auth, deleteTodo);

module.exports = router;
