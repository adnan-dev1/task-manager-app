const { Task, validate } = require('../models/task');
const express = require('express');
const router = express.Router();

// Get All Tasks
router.get('/', async(req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
});

// Add Task

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let task = new Task({
        name: req.body.name,
        desc: req.body.desc,
        isDone: req.body.isDone
    });

    task = await task.save();
    res.status(200).json(task);

});

// Update Task

router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const task = await Task.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            desc: req.body.desc,
            isDone: req.body.isDone
        }, { new: true }
    );

    if (!task) {
        return res.status(404).send("The Task with the given ID was not found.");
    }

    res.status(200).json("Task has been Updated....");

});

// Get Task

router.get('/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).send("The Task with the given ID was not found.");
    }
    res.status(200).json(task);

});

// Delete Task

router.delete('/:id', async(req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) {
        return res.status(404).send("The Task with the given ID was not found.");
    }
    res.status(200).json(task);
});

module.exports = router;