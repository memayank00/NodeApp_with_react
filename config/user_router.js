'use strict';
const path 	= require('path'),
multer      = require('multer'),
_ 			= require('lodash'),
config 		= require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
fs 			= require('fs');

/*  image upload using multer */
let uploadPhoto = multer({
	dest: config.user_image_destination,
	limits: config.galleryfileLimits,
	storage: multer.memoryStorage(),
	fileFilter: fileFilter
});

// User Profile image upload
let profileImage = multer({

	limits: config.fileLimits,
	storage: multer.diskStorage({
		destination: userProfileDirectory,
		filename: function (req, file, cb) {
			cb(null, Date.now() + '.' + config.file_extensions[file.mimetype]);
		}
	}),
	fileFilter: fileFilter

});

// User mail attachments
/*let attachment = multer({
	limits: config.galleryfileLimits,
	storage: multer.diskStorage({
		destination: path.resolve(config.MAIL_ATTACHMENT_PATH),
		filename: function (req, file, cb) {
			cb(null, Date.now() + path.extname(file.originalname));
		}
	})
});*/

function userProfileDirectory(req, file, cb) {
	let original_image_path = `${path.resolve(config.user_profile_image_path)}/${req.params.username}`,
	thumb_image_path = `${original_image_path}/thumb`;
	if(!fs.existsSync(original_image_path)){
		fs.mkdirSync(original_image_path);
		if(!fs.existsSync(thumb_image_path)) { fs.mkdirSync(thumb_image_path); }
	}
	cb(null, thumb_image_path);
}


/* Check if file is valid image */
function fileFilter (req, file, cb) {
	if(!_.includes(config.allowed_image_extensions, file.mimetype)){
		cb(new Error('Invalid image file'));
	}
	cb(null, true);
}

/* Require All the controllers */
let ctrls = {};
fs.readdirSync(path.resolve('./controllers/User')).forEach(file => {
	let name = file.substr(0,file.indexOf('.'));
	ctrls[name] = require(path.resolve(`./controllers/User/${name}`));
});

module.exports = {
	routes: [
		{ url: '/userEntry', method: ctrls.userCtrl.userEntry, type: 'POST' },
		{ url: '/userLogin', method: ctrls.userCtrl.userLogin, type: 'POST' },

    ]
};