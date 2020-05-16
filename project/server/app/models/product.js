const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:String,
    description:String,
    type:String,
})

mongoose.model('Product',ProductSchema )