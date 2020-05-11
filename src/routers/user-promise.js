const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch(() => {
        res.status(400).send(error)
    })
})
module.exports = router;