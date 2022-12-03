const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    task: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("todo", todoSchema);

// in mongoDb it will be save as todos
