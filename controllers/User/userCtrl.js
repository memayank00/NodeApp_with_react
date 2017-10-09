'use strict';
const jwt       = require('jsonwebtoken'),
    fs          = require('fs'),
    path        = require('path'),
    crypto      = require('crypto'),
    async       = require('async'),
    _           = require('lodash'),
    mongoose    = require('mongoose'),
    User        = require(path.resolve('./models/User'));
   
exports.userEntry = function(req, res, next) {
    let user = new User(req.body);
    user.save(function(err,savedUser){
        if(err){
            res.json({err:err,status:500});
        }else{
            res.json({message:'saves',data:savedUser ,status:200});
        }
    });
};

exports.userLogin = function(req, res, next) { 
  User.find({email:req.body.email,password:req.body.password},function(err,obj){
    if(err){
        next(err);
    }else{
        if(obj.length> 0 ){
            res.json({message:'user found',data:obj ,status:200});
        }else{
            res.json({message:'user not found',data:obj ,status:100}); 
        }
    }
  })
};