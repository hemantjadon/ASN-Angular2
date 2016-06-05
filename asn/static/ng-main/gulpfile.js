var gulp = require('gulp');
var watch = require('gulp-watch');

var rename = require('gulp-rename');

var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('tsconfig.json');

var less = require('gulp-less');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var cleancss = new LessPluginCleanCSS({ advanced: true });
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

gulp.task('copy-templates',function(){
    return gulp.src(['app/**/templates/**/*.html'])
               .pipe(gulp.dest('build/app'));
});

gulp.task('compile-less', function () {
    return gulp.src(['app/**/*.less'])
        .pipe(less({
            plugins:[autoprefix,cleancss]
        }))
        .pipe(rename(function(path){
            var x = path.dirname.split('/');
            path.dirname = x.join('/');
            return path;
        }))
        .pipe(gulp.dest('build/app'));
});

gulp.task('transpile-ts', function () {
    return tsProject.src(['app/**/*.ts'])
        			.pipe(tsc(tsProject))
        			.pipe(gulp.dest('build/app'));
});


gulp.task('watch',function () {
    watch(['app/**/*.ts'],function(){
        gulp.start('transpile-ts');
        
    });
    watch(['app/**/*.less'],function(){
        gulp.start('compile-less');
    });
    watch(['app/**/templates/**/*.html'],function(){
        gulp.start('copy-templates');
    });
});

gulp.task('default',['copy-templates','compile-less','transpile-ts','watch']);
