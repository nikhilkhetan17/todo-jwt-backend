const TodoModel = require("../model/todoModel");

exports.home = (req, res) => {
  res.send("Hello Todo");
};

// create task and title
exports.createTodo = async (req, res) => {
  try {
    const { title, task } = req.body;

    // check if title and task is there or not
    if (!(title && task)) {
      throw new Error("title and task both are required");
    }

    // inserting in DB
    const todo = await TodoModel.create({ title, task });
    res.status(201).json({
      success: true,
      message: "title added succesfully",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

// get todos
exports.getTodo = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(201).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// editTodo
exports.editTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      sucess: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// deleteTodo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      sucess: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
