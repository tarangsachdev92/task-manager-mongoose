const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error)

    }
})

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save()
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update => allowUpdates.includes(update)));

    if (!isValidOperation) {
        return res.status(404).send({ error: 'Invalide updates' });
    }
    const _id = req.params.id;
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) {
            return res.status(404).send()
        }
        res.send(task); // 200
    } catch (error) {
        res.status(400).send(error);
        // res.status(500).send(error)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(_id);
        console.log(task);
        if (!task) {
            return res.status(404).send()
        }
        res.send(task); // 200
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;