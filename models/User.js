'use strict';

const 
    mongoose        = require('mongoose'),
    path            = require('path'),
    config          = require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
    Schema          = mongoose.Schema,

UserSchema 	= new Schema({
   
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: String
    }
    
},{ timestamps : { createdAt: 'created_at' ,  updatedAt: 'updated_at'}});

module.exports = mongoose.model('User', UserSchema);
