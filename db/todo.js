import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  todo: {
    type: String,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export { Todo };
