'use strict';

const gulp      = require('gulp'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    nodemon     = require('gulp-nodemon'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    cleancss    = require('gulp-clean-css'),
    pump        = require('pump'),
    sourcemaps  = require('gulp-sourcemaps'),
    rev         = require('gulp-rev'),
    revReplace  = require('gulp-rev-replace'),
    //notify      = require('gulp-notify'),
    //livereload  = require('gulp-livereload'),
    fs          = require('fs');

/*
 * This package is used for restart node server every our server file changes
 * source: https://www.npmjs.com/package/nodemon
 */

gulp.task('nodemon', () => {
    //livereload.listen();
    nodemon({
        tasks: ['jshint'],
        script: 'server.js',
        ext: 'js html',
        ignore: ['node_modules/', 'public/bower_components/', 'public/js/', 'test/', 'coverage/', 'public/images/','public/css/fonts/','*.html'],
    })
    .on('restart', () => {
        /*gulp.src('server.js')
        .pipe(livereload())
        .pipe(notify('Task completed'));*/
    });
});

/*
 * JSHint to lint all the js files
 */

gulp.task('jshint',['app:uglify','admin.app:uglify'],  () => {
    return gulp.src([
       

    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


/*
* To check whether .env file exists or not
* if not exists, create the file and write the env variable
*/
gulp.task('check:env', () => {
    fs.stat(`${__dirname}/.env`, (err, success) => {
        if(err){
            try{
                let path = `${__dirname}/.env`;
                if(fs.openSync(path,'w')){
                    fs.writeFileSync(path,'NODE_ENV=local');
                }
            } catch(e){
                console.error(`System is unable to create ".env" file, please create ".env" file in root directory and specify the "NODE_ENV" to either one of these (development, production) eg. NODE_ENV=development`);
            }
        }
    });
});

gulp.task('app:uglify', (cb) => {
    pump([
        gulp.src([

               

        ]),
        // sourcemaps.init({loadMaps: true}),
        concat('app.min.js'),
        uglify(),
        // sourcemaps.write('../maps'),
        gulp.dest('./public/js')
    ],cb);
});
gulp.task('admin.app:uglify', (cb) => {
    pump([
        gulp.src([
        ]),
        concat('admin.app.min.js'),
        uglify(),
        gulp.dest('./public/js')
    ],cb);
});



gulp.task('default', [
    'check:env',
    'jshint',
    'nodemon',
    //'site:uglify',
    'app:uglify',
    //'app:cssmin',
    //'admin-site:uglify',
    'admin.app:uglify',
    //'admin-site:cssmin'
], function() {
    console.log("gulp all tasks finished");
});
