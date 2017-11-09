const browserSync = require("browser-sync").create(),
      gulp = require("gulp"),
      webpack = require("webpack"),
      gulpWebpack = require("webpack-stream"),
      webpackConfig = require("./webpack.config.js"),
      webpackDevelopConfig = require("./webpack.develop.js"),
      webpackProdConfig = require("./webpack.prod.js"),
      sass = require("gulp-sass"),
      rename = require("gulp-rename"),
      cleanCSS = require("gulp-clean-css"),
      runSequence = require("run-sequence");


/*      DEVELOPMENT     */

gulp.task("serve", function() {
    browserSync.init({
        server: "build"
    });

    gulp.watch("build/*.html", browserSync.reload)
    gulp.watch("src/*.js", ["develop-build"]);
    gulp.watch("src/**/*.js", ["develop-build"]);
    gulp.watch("src/**/*.jsx", ["develop-build"]);
    gulp.watch("src/templates/*.pug", ["develop-build"]);
    gulp.watch("src/**/*.scss", ["develop-sass"]);
});

gulp.task("develop-sass", function() {
  return gulp.src("src/scss/main.scss")
          .pipe(sass().on("error", sass.logError))
          .pipe(rename("style.css"))
          .pipe(gulp.dest("build/css"))
          .pipe(browserSync.stream());
})

gulp.task("develop-build", function() {
  return gulp.src("src/main.jsx")
          .pipe(gulpWebpack(webpackDevelopConfig, webpack))
          .pipe(gulp.dest("build"))
          .pipe(browserSync.stream());
})

gulp.task("develop-copy-assets", function() {
  return gulp.src("src/assets/**/*")
          .pipe(gulp.dest("build"))
})

gulp.task("default", function() {
  runSequence(
    "develop-build",
    "develop-sass",
    "develop-copy-assets",
    "serve"
  )
})


/*      PRODUCTION      */

gulp.task("production-webpack", function() {
  return gulp.src("src/main.jsx")
          .pipe(gulpWebpack(webpackProdConfig, webpack))
          .pipe(gulp.dest("dist"));
})

gulp.task("copy-assets", function() {
  return gulp.src("src/assets/**/*")
          .pipe(gulp.dest("dist"))
})

gulp.task("sass", function() {
  return gulp.src("src/scss/main.scss")
          .pipe(sass().on("error", sass.logError))
          .pipe(cleanCSS())
          .pipe(rename("style.css"))
          .pipe(gulp.dest("dist/css"));
})

gulp.task("production-build", function() {
  runSequence(
    "production-webpack",
    "sass",
    "copy-assets"
  )
});
