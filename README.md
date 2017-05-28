# TEDxACCD 2017 Event Page

A [Hugo](https://gohugo.io/) powered static site utilizing [Gulp](http://gulpjs.com/) and [Webpack](https://webpack.js.org/) as an asset pipeline.

It's setup to use [post-css next](http://cssnext.io/) and [babel](https://babeljs.io/) for CSS and JavaScript.

## Usage

Be sure that you have the latest node, npm and [Hugo](https://gohugo.io/) installed. If you need to install hugo on OSX, run:

```bash
brew install hugo
```

If you don't use OSX or don't use homebrew, follow the instructions for installation here instead:

http://gohugo.io/overview/installing/

Next, clone this repository and run:

```bash
npm install
npm start
```

Then visit http://localhost:3000/ - BrowserSync will automatically reload CSS or
refresh the page when stylesheets or content changes.

To build your static output to the `/dist` folder, use:

```bash
npm run build
```

Designed, developed and maintained by James Chu.

Based on [Victor Hugo](https://github.com/netlify/victor-hugo) boilerplate by [Netlify](https://www.netlify.com/).
