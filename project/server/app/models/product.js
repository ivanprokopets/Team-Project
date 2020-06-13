const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:String,
    type:String,
})

mongoose.model('Product',ProductSchema )