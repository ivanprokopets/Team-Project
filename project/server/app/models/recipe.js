const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: String,
    timeForPreparing:String,
    description:String,
    ingredients: Array,
    isPublic:Boolean,
    rating:Number,
    creatorId:String,
    likers:Array
})

mongoose.model('Recipe',RecipeSchema );