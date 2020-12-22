// next.config.js
const withImages = require('next-images');
module.exports = withImages({
  fileExtensions: ['png'],
  webpack(config, _options) {
    return config;
  },
});
