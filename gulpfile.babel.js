import gulp from "gulp";
import cp from "child_process";
import gutil from "gulp-util";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";
import beautify from "gulp-html-beautify";
import svgstore from "gulp-svgstore";
import inject from "gulp-inject";
import svgmin from "gulp-svgmin";
import del from "del";

const browserSync = BrowserSync.create();
const hugoBin = "hugo";
const defaultArgs = ["-d", "../dist", "-s", "site", "-v"];

gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, ["--buildDrafts", "--buildFuture"]));

gulp.task("build", ["css", "js", "hugo", "beautify"]);
gulp.task("build-preview", ["css", "js", "hugo-preview"]);

gulp.task("beautify", () => (
  gulp.src("./dist/**/*.html")
    .pipe(beautify())
    .pipe(gulp.dest("./dist/"))
));

gulp.task("svgstore", () => {
  const svgs = gulp
    .src("./src/svg/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({ inlineSvg: true }));

  function fileContents(filePath, file) {
      return file.contents.toString();
  }

  return gulp
      .src("./site/layouts/partials/svg/inline.html")
      .pipe(inject(svgs, { transform: fileContents }))
      .pipe(gulp.dest("./site/layouts/partials/svg/"));
});

gulp.task("clean", () => del ("./dist/**/*"));

gulp.task("css", () => (
  gulp.src("./src/css/*.css")
    .pipe(postcss([cssImport({from: "./src/css/main.css"}), cssnext({features:{calc:false}})]))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
));

gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});

gulp.task("server", ["svgstore", "hugo", "css", "js"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("./src/js/**/*.js", ["js"]);
  gulp.watch("./src/css/**/*.css", ["css"]);
  gulp.watch("./site/**/*", ["hugo"]);
});

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
