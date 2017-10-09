'use strict';
require('dotenv').config({silent: true});
/*
* All the required node packages
*/
const express 	= require('express'),
	app 		= express(),
    cors        = require('cors'),
	path 		= require('path'),
	bodyParser 	= require('body-parser'),
	morgan 		= require('morgan'),
	mongoose 	= require('mongoose'),
	helmet 		= require('helmet'),
	compress 	= require('compression'),
	routes 		= require(path.resolve('./config/routes')),
	config 		= require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
	https 		= require('https'),
	http 		= require('http'),
	fs 			= require("fs");
	

const httpServer 	= http.createServer(app);



mongoose.set('debug', config.db.DEBUG);
mongoose.Promise = require('bluebird');
mongoose.connect(config.db.URL, {autoReconnect: true, useMongoClient:true});

/* Node.js compression middleware
* The middleware will attempt to compress response bodies for all request that traverse through the middleware
* Should be placed before express.static
*/


app.use(compress({
    filter: function (req, res) {
      return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    },
    level: 9
}));

/*enable cors*/
app.use(cors());

/**
* Configure Helmet headers configuration
* Use helmet to secure Express headers
*/
app.use(helmet());

/*
* Serving static files in Express using express static middleware
* these files will be access publicly
*/

app.use(express.static(path.resolve('./public')));
app.set('views', path.join(__dirname, '/public'));

app.set('view engine', 'ejs');

/*
* uncomment the following when the favicon is available
* Initialize favicon middleware
*/
// app.use(favicon(`${__dirname}/public/images/favicon.ico`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

//app.use(redirects.to);
app.get('/robots.txt',function(req,res){
 res.sendFile(__dirname +'/robots.txt');
});
app.get('/sitemap.xml',function(req,res){
 res.sendFile(__dirname +'/sitemap.xml');
});
/* Register all your routes */
app.use('/api', routes.router);
app.use('/admin', routes.admin);

//http://stackoverflow.com/questions/35216601/angular-url-removing-using-express-to-route-request
app.get(/^((?!\/(api)).)*$/, function (req, res) {
	res.render('index');
});


// Global Error Handler
app.use((err, req, res, next) => {
	if(err){
		//logger.log('error', err);
		res.status(err.status || 500).json({
			errors: {
				source: err.errors || err,
				code: err.code,
				message: err.message || 'Some error occurred, try after sometime!!',
				success: false
			},
			message: err.message || 'Some error occurred, try after sometime!!',
			status: 2
		});
	}
	next();
});

/*
* Start the node server using node 'http' package
*/
// if( process.env.NODE_ENV === 'production' ){
httpServer.listen(config.server.PORT, () => {
	//adminCtrl.register();
    console.log(`Listening on server port:${config.server.PORT}`);
});


/*
* we need app package for tests so we are exporting this for our tests
*/
module.exports = app;