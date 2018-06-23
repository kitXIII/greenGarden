const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const BS = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const gulpsync = require('gulp-sync')(gulp);
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const del = require('del');

const dest = 'dest';
const src = 'src';
const path = {
  dest: {
    html: dest,
    js: `${dest}/js/`,
    css: `${dest}/css/`,
    json: dest,
  },
  src: {
    html: `${src}/*.html`,
    js: `${src}/**/*.js`,
    scss: `${src}/**/*.scss`,
    json: `${src}/*.json`,
  },
};

/* настройки сервера */
const BSconfig = {
  server: {
    baseDir: dest,
  },
  notify: false,
};

const autoprefixerList = [
  'Chrome >= 45',
  'Firefox ESR',
  'Edge >= 12',
  'Explorer >= 10',
  'iOS >= 9',
  'Safari >= 9',
  'Android >= 4.4',
  'Opera >= 30',
];

gulp.task('server', () => {
  BS(BSconfig);
});

gulp.task('html:compile', () => {
  gulp.src(path.src.html)
    .pipe(plumber()) // отслеживание ошибок
    .pipe(gulp.dest(path.dest.html))
    .pipe(BS.reload({
      stream: true,
    }));
});

gulp.task('css:compile', () => {
  gulp.src(path.src.scss)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: autoprefixerList,
      cascade: true,
    }))
    .pipe(gulp.dest(path.dest.css))
    .pipe(BS.reload({
      stream: true,
    }));
});

gulp.task('js:compile', () => {
  gulp.src(path.src.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dest.js))
    .pipe(BS.reload({ stream: true }));
});

gulp.task('copy', () => {
  gulp.src(path.src.json)
    .pipe(gulp.dest(path.dest.json));
});

gulp.task('clean:dest', () => {
  del.sync(dest);
});

gulp.task('compile', [
  'html:compile',
  'css:compile',
  'js:compile',
  'copy',
]);

gulp.task('watch', ['compile'], () => {
  gulp.watch(path.src.html, ['html:compile']);
  gulp.watch(path.src.scss, ['css:compile']);
  gulp.watch(path.src.js, ['js:compile']);
});

gulp.task('default', gulpsync.sync(['clean:dest', ['watch', 'server']]));
