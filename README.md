# Good Share

Good Share is a share button library with [Web Share API](https://css-tricks.com/how-to-use-the-web-share-api/) integration.

Using the Web Share API, it allows the user to share content using the native share dialog on [supported browsers](https://caniuse.com/#feat=web-share). 

For unsupported browsers, a fallback modal window with sharing buttons can be used by the user.

Feel free to [let me know](https://twitter.com/cmyee) if you use Good Share in one of your websites.

[View Demo](https://chrisyee.ca/good-share/) | [Download](https://github.com/christophery/good-share/releases/latest)

## Features
- Web Share API for native share
- Fallback modal for [unsupported browsers](https://caniuse.com/#feat=web-share)
- Multiple share buttons
- Uses CSS animations
- Fallback modal closes when the site overlay is selected
- Keyboard support for closing fallback modal (esc key)
- Supports [Open Graph Metadata](https://ogp.me/)

## Requirements
- Your website must be served over [HTTPS](https://www.cloudflare.com/learning/ssl/what-is-https/)
- Sharing can only be triggered by a user action (click or touch)

## Getting Started

- Include the CSS and JS files from the `dist/` folder.

```html
<link rel="stylesheet" href="css/good-share.min.css">
```

```html
<script src="js/good-share.min.js"></script>
```

- Add the `.good-share` CSS class to you share buttons along with the [data attribute options](#options).

```html
<button class="good-share" data-share-title="Hello World" data-share-url="https://chrisyee.ca">
  Share This
</button>
```

## Options

### data-share-title
The title to be shared.

``data-share-title="Hello World"``

### data-share-text
The text to be shared.

``data-share-text="Lorem ipsum dolor sit amet"``

### data-share-url
The URL to be shared.

``data-share-url="https://chrisyee.ca"``


## Development
Good Share CSS and JS are compiled and minified using Gulp. You'll need [Node](https://nodejs.org/en/) and [Gulp](https://gulpjs.com/) installed globally.

**From the root directory run:**

```
$ npm install
$ gulp
```

Now you can edit `css/good-share.scss` and `js/good-share.js`, which will be compiled to `dist/` automatically.
