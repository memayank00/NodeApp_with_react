"use strict";
const path = require('path');

const config = {
    db: {
        URL: 'mongodb://100.100.7.165/ReactApp',
        //URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@100.100.7.165/ReactApp?authSource=${process.env.AUTHENTICATION_DATABASE}`,
       // URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@100.100.7.38/ReactApp?authSource=${process.env.AUTHENTICATION_DATABASE}`,
        DEBUG: true,
        autoIndex: true,
        log: true
    },
    server: {
        PORT: 3003,
        HOSTNAME: 'http://localhost:3003/'
    },
   
    file_extensions : {
        'image/jpeg' : 'jpg',
        'image/jpg' : 'jpg',
        'image/png' : 'png',
        'image/gif' : 'gif',
        'image/bmp' : 'bmp',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':'xlsx'
    }
   
};
module.exports = config;