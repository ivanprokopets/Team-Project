const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email:String,
    password: String,
    recipes: Array,
})

mongoose.model('User',UserSchema );