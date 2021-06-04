const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    dish_name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true,

    },
},{
    timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;