const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// Create a new todo
router.post('/', async (req, res) => {
    const { title } = req.body;

    const newTodo = new Todo({
        title
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a todo
// router.patch('/:id', async (req, res) => {
//     try {
//         const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedTodo);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// Toggle the completion status of a todo
router.patch('/:id/toggleComplete', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.completed = !todo.completed;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
