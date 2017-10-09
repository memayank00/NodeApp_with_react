'use strict';
const path 	= require('path'),
multer      = require('multer'),
_ 			= require('lodash'),
config 		= require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
fs 			= require('fs');

/* Require All the controllers */
let ctrls = {};
fs.readdirSync(path.resolve('./controllers/Admin')).forEach(file => {
	let name = file.substr(0,file.indexOf('.'));
	ctrls[name] = require(path.resolve(`./controllers/Admin/${name}`));
});

let uploadPhoto = multer({
	dest: config.user_image_destination,
	limits: config.galleryfileLimits,
	storage: multer.memoryStorage(),
	fileFilter: fileFilter
});

/* Check if file is valid image */
function fileFilter (req, file, cb) {
	if(!_.includes(config.allowed_image_extensions, file.mimetype)){
		cb(new Error('Invalid image file'));
	}
	cb(null, true);
}

let uploadFile = multer({

	limits: config.fileLimits,
	storage: multer.diskStorage({
		destination: professionalUserDirectory,
		filename: function (req, file, cb) {
			
			cb(null,'professional_user'+ '.' + config.file_extensions[file.mimetype]);
		}
	}),
	fileFilter: fileFilterToCsv

});

function professionalUserDirectory(req, file, cb) {
	let original_file_path = `${path.resolve(config.professional_user_path)}`;
	if(!fs.existsSync(original_file_path)){
		fs.mkdirSync(original_file_path);
	}
	cb(null, original_file_path);
}

/* Check if file is valid image */
function fileFilterToCsv (req, file, cb) {
	if(!_.includes(config.allowed_file_extensions, file.mimetype)){
		cb(new Error('Invalid file'));
	}
	cb(null, true);
}

module.exports = {
  	routes: [
  		/*{ url: '/login', method: ctrls.adminCtrl.login, type: 'POST' },
  		{ url: '/members', method: ctrls.membersCtrl.getMembers, type: 'GET' },
  		{ url: '/addAdminBlog', mwear: uploadPhoto.any(), method: ctrls.blogCtrl.addAdminBlog, type: 'SPECIALPOST' },
      */
	]
};