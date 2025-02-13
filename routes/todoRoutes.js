const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todo-controller');

// creating a todo 
router.post('/', authMiddleware, createTodo);

// getting all the todo 
router.get('/', authMiddleware, getTodos);

// editing a single todo 
router.put('/:id', authMiddleware, updateTodo);

// deleting a todo 
router.delete('/:id', authMiddleware, deleteTodo);

module.exports = router;