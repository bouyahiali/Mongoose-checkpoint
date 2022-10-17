const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: {
        type : String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
})

const Person = mongoose.model('person', personSchema);
module.exports = Person;