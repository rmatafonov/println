const path = require('path')

module.exports = {
  src: path.resolve(__dirname, '../src'),
  utils: path.resolve(__dirname, '../src/utils'),
  api: path.resolve(__dirname, '../src/api'),
  components: path.resolve(__dirname, '../src/components'),
  styles: path.resolve(__dirname, '../src/styles'),
  pages: path.resolve(__dirname, '../src/pages'),
  build: path.resolve(__dirname, '../dist'),
  static: path.resolve(__dirname, '../static'),
}
