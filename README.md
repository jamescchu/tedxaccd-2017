# TEDxACCD 2017 Event Page

The official event page for the 2017 TEDxACCD event. TEDxACCD is a
bi-annual event uniquely led by students to create passionate
conversations within the community by sharing and spreading ideas
intersecting in technology, entertainment, and design.

[Event Site](https://2017.tedxaccd.com)

## Development

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

## Tech Stack

- [Hugo](https://gohugo.io/)
  - A super fast Go-powered static site generator.
- [Gulp](http://gulpjs.com/)
  - Handy Javascript task runner for automation.
- [Webpack](https://webpack.js.org/)
  - The new and trendy Javascript bundler.
- [cssnext](http://cssnext.io/)
  - PostCSS plugin that allows using future CSS features, today.
- [Babel](https://babeljs.io/)
  - Transpiler for converting Javascript ES6 into ES5.
- [BarbaJS](http://barbajs.org/)
  - Small PJAX library allowing for seamless page transitions.
- [AOS](http://michalsnik.github.io/aos/)
  - Adds CSS animations to elements as you scroll.
- [MoveTo](https://hsnaydd.github.io/moveTo/demo/)
  - Scroll animations that pushes people up and down the page.
- [VanillaModal](http://benceg.github.io/vanilla-modal/)
  - Creates modals with a variety of content.
- [Plyr](https://plyr.io/)
  - A simple, accessible HTML5 media player.
- [Balloon](https://kazzkiq.github.io/balloon.css/)
  - CSS driven tool-tips.
- [minireset](http://jgthms.com/minireset.css/)
  - Tiny CSS reset for consistency across browsers.

Based on [Victor Hugo](https://github.com/netlify/victor-hugo) boilerplate by [Netlify](https://www.netlify.com/).
