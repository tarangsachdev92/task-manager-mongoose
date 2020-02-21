const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);
    // console.log(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e)
    })
    // res.send('testing');
})

app.get('/users', (req, res) => {
    // User.find({}).then((users) => {
    User.find().then((users) => {
        res.send(users);
    }).catch((e) => {
        res.status(500).send(e)
    })
    // res.send('testing');
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user);
    }).catch((e) => {
        res.status(500).send(e)
    })
    // res.send('testing');
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e)
    })
    // res.send('testing');
})


app.listen(port, () => {
    console.log('the server is up on ' + port)
})