const express = require('express')
const mongoose = require('mongoose');
const Person = require('./models/Person');
const data = require('./data');

const app = express()

require('dotenv').config();
main().catch(err => console.log(err.message));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('connected to database');
}

const addData = async () => {
    try {
        Person.insertMany(data, (err, result) => {
            if (err) {console.log(err.message)}
            if (result) {console.log('insert succeeded')}
        }).save()
    }catch (err) {console.log(err.message)};
}
// addData()

const addOnePerson = async () => {
    const newPerson = new Person ({
        name : 'nader',
        age : 29,
        favoriteFoods : ["koskos","salad"]
    })
    newPerson.save(function (err, result) {
        if (err) {console.log(err.message)} else {console.log('insert new person')}
    });
}
// addOnePerson()

const allPerson = async () => {
    try {
        Person.find({},function (err, person) {
            if (err) {console.log(err.message)}
            else {console.log(person)}
        })
    } catch (error) {
        console.log(error.message)
    }
}

// allPerson()

const OnePerson = async (id) => {
    try {
        Person.findOne({_id : id},function (err, person) {
            if (err) {console.log(err.message)}
            else {console.log(person)}
        })
    } catch (error) {
        console.log(error.message)
    }
}

// OnePerson("6346b5e3635a92bc93cbf0bc")

const findPersonByFood = async (food) => {
    try {
        Person.findOne({favoriteFoods : food},function (err, person) {
            if (err) {console.log(err.message)}
            else {console.log(person)}
        })
    } catch (error) {
        console.log(error.message)
    }
}

// findPersonByFood("koskos")

const findPersonADDFood = async (id,food) => {
    try {
        const person = await Person.findOne({_id : id})

        await person.favoriteFoods.push(food)
        await person.save(function (err, person) {
            if (err) {console.log(err.message)}
            else {console.log(person)}
        })
    } catch (error) {
        console.log(error.message)
    }
}

// findPersonADDFood("6346b194b0b56a78c37d1d7b","Hamborger")

const updatePersonAge = async (id) => {
    try {
        Person.findByIdAndUpdate({_id : id},{age : 20},function (err, person) {
            if (err) {console.log(err.message)}
            else {console.log('update successful')}
        })
    } catch (error) {
        console.log(error.message)
    }
}

// updatePersonAge("6346b194b0b56a78c37d1d7b")

const deletePersonById = async (id) => {
    try {
            Person.findByIdAndRemove({_id: id} , function (err, person) {
                if (err) {console.log(err.message)}
                else {console.log('delete successful')}
            })
        
    }catch (error) {
        console.log(error.message)
    }
}

// deletePersonById("6346b194b0b56a78c37d1d7c")

// deleteAllPersonWithName
//  Person.deleteMany({name: 'nader'}).then(function(){
//     console.log("name deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

const queryChain = async function(food) {
   try {
    await Person.find({food:foodToSearch})
          .sort({ name: 1 }) // -1 for descending
          .limit(2)
          .select({ age: 20 })
          }catch (error) {
            console.log(error.message)
        }
    }

// queryChain()


const port = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))