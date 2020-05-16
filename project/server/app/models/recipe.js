const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: String,
    timeForPreparing:String,
    description:String,
    products: Array,
    isPublic:Boolean
})

mongoose.model('Recipe',RecipeSchema );