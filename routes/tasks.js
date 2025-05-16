const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    const { text } = req.body;
    try {
        const newTask = new Task({ text });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: 'Error creating task' });
    }
});

// DELETE a task by custom integer id
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deleted = await Task.findOneAndDelete({ id });
        if (!deleted) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

// PUT (update) a task by custom integer id
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;

    try {
        const updatedTask = await Task.findOneAndUpdate(
            { id },
            { text },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;