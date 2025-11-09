const path = require('path');

module.exports = {
  entry: './src/contentScript.js',
  output: {
    filename: 'contentScript.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  optimization: {
    minimize: true
  }
};
