const mongoose = require('mongoose');
const User = require('../models/user');
const Task = require('../models/task');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,// this means when mongoose works with mongoDb our indexes are create allowing us 
    // to qucikly access the data we need to access 
    useFindAndModify: false // to remove depricated warning DeprecationWarning: collection.findAndModify is deprecated.
    // Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead. -> 93 lecture 17:45 min.
})

const me = new User({
    name: ' smartyTarang   ',
    age: 27,
    email: '  smarttarang@gmail.com ',
    password: 'ab@23',

})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})

// const task = new Task({
//     description: 'This is my task 3',
//     completed: true,
// });

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log('Error!', error)
// })
