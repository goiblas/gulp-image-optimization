const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGuetzli = require('imagemin-guetzli');
const imageminWebp = require('imagemin-webp');
const webp = require('gulp-webp');

gulp.task('png', () =>
    gulp.src('src/img/*.{svg,png}')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('dist'))
);

gulp.task('webp', () =>
    gulp.src('src/img/*.{jpg,png}')
        .pipe(webp({
            quality: 80,
            preset: 'photo',
            method: 6
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('mozjpeg', () =>
    gulp.src('src/img/*.jpg')
        .pipe(imagemin([imageminMozjpeg({
            quality: 85
        })]))
        .pipe(gulp.dest('dist'))
);

gulp.task('guetzli', () =>
    gulp.src('src/img/*.jpg')
        .pipe(imagemin([imageminGuetzli({
            quality: 85
        })]))
        .pipe(gulp.dest('dist'))
);