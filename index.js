const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url);

connect.then(db =>{
    console.log('Connected correctly to server');

    Dishes.create({
        dish_name: "Peter Hu",
        description: 'haha test description' 
    })
        .then(dish => {
            console.log(dish);

            return Dishes.find({}).exec();
        })
        .then( dishes => {
            console.log(dishes);
            
            return Dishes.deleteMany({});
        })
        .then( _=>{
            return mongoose.connection.close();
        })
        .catch(err => {
            console.log(err);
        });
});