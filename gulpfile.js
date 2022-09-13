import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import squoosh from 'gulp-libsquoosh';
import terser from 'gulp-terser';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import browser from 'browser-sync';
import del from 'del';


// Styles
export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));

}

// Scripts
const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('build/js'));
}

// Images
const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,jpeg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}
const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,jpeg,png}')
    .pipe(gulp.dest('build/img'));
}

// Webp
const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,jpeg,png}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'));
}

// SVG
const svg = () => {
  return gulp.src(['source/img/svg/*.svg', '!source/img/favicons/*.svg', '!source/img/svg/icons/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img/svg'));
}
const sprite = () => {
  return gulp.src('source/img/svg/icons/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

// Favicons
const svgFavicon = () => {
  return gulp.src('source/img/favicons/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/img/favicons'));
}

// Fonts
const copy = (done) => {
  return gulp.src(
    ['source/fonts/*.{woff2, woff}', 'source/*.ico', 'source/*.webmanifest'], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

// Clean
const clean = () => {
  return del('build');
}

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
const reload = (done) => {
  browser.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/scripts.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build
export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    html,
    styles,
    scripts,
    svg,
    svgFavicon,
    sprite,
    createWebp
  ),
);

// Default
export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    html,
    styles,
    scripts,
    svg,
    svgFavicon,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
