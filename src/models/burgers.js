const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
});

const burgerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    promotion: {
        type: String,
        default: null,
    },
    stock: {
        type: Number,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);
const Burger = mongoose.model('Burger', burgerSchema);

module.exports = { User, Burger };