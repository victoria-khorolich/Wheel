const { src, dest, parallel, series, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const del = require("del");
const rigger = require("gulp-rigger");
const htmlmin = require("gulp-htmlmin");

function browsersync() {
  browserSync.init({
    server: { baseDir: "dist/" },
    notify: false,
    online: true,
  });
}
function cleanimg() {
  return del("dist/images/**/*", { force: true });
}
function cleanHtml() {
  return del("dist/*.html", { force: true });
}
function cleandist() {
  return del("dist/**/*", { force: true });
}
function html() {
  cleanHtml();
  return src("app/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist/"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(["app/js/app.js"])
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(dest("dist/js/"))
    .pipe(browserSync.stream());
}

function styles() {
  return src(["app/scss/app.scss"])
    .pipe(sass())
    .pipe(concat("app.min.css"))
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    )
    .pipe(
      cleancss({ level: { 1: { specialComments: 0 } } /*format: 'beautify'*/ })
    )
    .pipe(dest("dist/css/"))
    .pipe(browserSync.stream())
    .pipe(rigger());
}

function images() {
  cleanimg();
  return src("app/images/**/*")
    .pipe(newer("dist/images/"))
    .pipe(imagemin())
    .pipe(dest("dist/images/"));
}

function starwatch() {
  watch("app/scss/**/*.scss", styles);
  watch(["app/**/*.js", "!app/**/*.min.js"], scripts);
  watch("app/**/*.html").on("change", html);
  watch("app/images/**/*", images);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.build = series(cleandist, styles, scripts, html, images);

exports.default = parallel(scripts, styles, browsersync, starwatch);

exports.start = parallel(scripts, styles, html, browsersync, starwatch);
