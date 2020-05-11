const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        // minlength: 7,
        trim: true,
        validate(value) {
            if (value.length < 7) {
                throw new Error('Password must be greater than 6 character')
            } else if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid')
            }
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            // console.log(value);
            if (value < 0) {
                throw new Error('Age must be positive number')
            }
        }
    }
})

module.exports = User;