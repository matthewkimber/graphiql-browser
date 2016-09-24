var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');

// 1. Clean.
//   a. Remove "dist" folder.
//   b. Add "dist" folder.
// 2. Run Babel. server.js -o dist/server.js
// 3. Copy dependencies.
//   a. copy node_modules/graphiql/graphiql.js dist/graphiql.js
//   b. copy node_modules/graphiql/graphiql.css dist/graphiql.css
// 4. Copy vendor files - vendor/ -> dist/vendor
// 5. Copy index.html -> dist/index.html

gulp.task('default', ['clean', 'build', 'copy-graphiql-dependencies', 'copy-vendor-dependencies', 'copy-html']);

gulp.task('clean', function() {
    return del(['./dist/**/*', './dist']);
});

gulp.task('build', function() {
    return gulp.src('./server.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-graphiql-dependencies', function() {
    return gulp.src(['./node_modules/graphiql/graphiql.js', 
                    './node_modules/graphiql/graphiql.css'])
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-vendor-dependencies', function() {
    return gulp.src(['./node_modules/react/dist/react.js',
                    './node_modules/react-dom/dist/react-dom.js',
                    './node_modules/fetch/lib/fetch.js'])
        .pipe(gulp.dest('dist/vendor'));
});

gulp.task('copy-html', function() {
    return gulp.src(['./index.html'])
        .pipe(gulp.dest('dist'));
});