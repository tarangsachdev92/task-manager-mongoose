const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(201).send(users);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send()
        }
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'age', 'password', 'email'];
    const isValidOperation = updates.every((update => allowUpdates.includes(update)));

    if (!isValidOperation) {
        return res.status(404).send({ error: 'Invalide updates' });
    }
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).send()
        }
        res.send(user); // 200
    } catch (error) {
        res.status(400).send(error);
        // res.status(500).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        // console.log(user);
        if (!user) {
            return res.status(404).send()
        }
        res.send(user); // 200
    } catch (error) {
        // res.status(400).send(error);
        res.status(500).send(error)
    }
})

module.exports = router;