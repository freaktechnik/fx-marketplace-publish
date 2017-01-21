# fx-marketplace-publish

[![Greenkeeper badge](https://badges.greenkeeper.io/freaktechnik/fx-marketplace-publish.svg)](https://greenkeeper.io/)
Easily publish an application on the Firefox Marketplace

## Install
Install the package in your project using `npm install --save fx-marketplace-publish`.

## Documentation
### publish(options)
`options`: Object

The options object can have the following properties:

  * `path`: Path to the webapp manifest in the web, or to a local packaged application
  * `consumerKey`: Your consumer API key for the marketplace, inherited from [node-firefox-marketplace][], see their documentation for more info.
  * `consumerSecret`: Your consumer API secret for the marketplace, inherited from [node-firefox-marketplace][], see their documentation for more info.
  * `environment`: The marketplace you want to publish to, inherited from [node-firefox-marketplace][], see their documentation for more info. Defaults to `"development"`
  * `type`: Optional webapp type specifier. Can be either `"manifest"` or `"packaged"`. Else the type is sniffed from the file extension in the `path` property.

Returns a Promise, which resolves when the app is successfully published on the firefox marketplace, and gets rejected whenever an error occurs, including a failed validation.

## Example
This code snippet publishes a webapp packaged in `dist/my-webapp.zip` in the production environment of Firefox Marketplace (http://marketplace.firefox.com).
```js
var { publish } = require("fx-marketplace-publish");

publish({
  path: 'dist/my-webapp.zip',
  consumerKey: "myConsumerKey",
  consumerSecret: "myConsumerSecret",
  environment: "production"
});
```

## [License](LICENSE)
This project is licensed under the MPL-2.0.

[node-firefox-marketplace]: https://www.npmjs.com/package/node-firefox-marketplace

