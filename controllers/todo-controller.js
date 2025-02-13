const Todo = require("../models/todoModel");

// create a todo 
const createTodo = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const userId = req.user._id;

        // console.log(userId)

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        const newTodo = new Todo({
            userId,
            title,
            description,
        });

        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error: error.message });
    }
};

// Get all todos
const getTodos = async (req, res) => {
    try {
        const userId = req.user._id;
        const todos = await Todo.find({ userId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos", error: error.message });
    }
};

// edit the todo 
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params; // Todo ID from URL
        const { title, description, completed } = req.body;
        const userId = req.user._id;

        // Find the todo and ensure it belongs to the logged-in user
        const todo = await Todo.findOne({ _id: id, userId });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found or not authorized to update" });
        }

        // Update the todo
        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.completed = completed !== undefined ? completed : todo.completed;

        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: "Error updating todo", error: error.message });
    }
};

// delete a todo
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params; // Todo ID from URL
        const userId = req.user._id;

        const todo = await Todo.findOne({ _id: id, userId });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found or not authorized to delete" });
        }

        // Delete the todo
        await todo.deleteOne();
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo", error: error.message });
    }
};


module.exports = { createTodo, getTodos, updateTodo, deleteTodo }