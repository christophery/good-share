# Good Share

Good Share is a share button library with Web Share API integration.

Using the Web Share API, it allows the user to share content using the native share dialog on [supported browsers](https://caniuse.com/#feat=web-share).

For unsupported browsers, a fallback modal window with sharing buttons can be used by the user.

## Features
- Web Share API for native share
- Fallback modal for [unsupported browsers](https://caniuse.com/#feat=web-share)
- Multiple share buttons
- Uses CSS animations
- Fallback modal closes when the site overlay is selected
- Keyboard support for closing fallback modal (esc key)

## Getting Started

- Add the stylesheet in the `<head>` and the JS file in the `<footer>`

``
<link rel="stylesheet" href="css/good-share.css">
``

``
<script src="js/good-share.js"></script>
``

- Add the `.good-share` CSS class to you share buttons along with the [data attribute options](#Options).

```html
<button class="good-share" data-share-title="Hello World" data-share-url="https://chrisyee.ca">Share This</button>
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