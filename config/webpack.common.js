const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const paths = require('./paths')

module.exports = {
  entry: `${paths.src}/index.tsx`,
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    clean: true,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: `${paths.static}/index.html`,
      favicon: `${paths.static}/icons/favicon.png`,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jpg'],
    alias: {
      '@': paths.src,
    },
  },
  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx$/,
        use: 'ts-loader',
        exclude: /(node_modules)/,
      },
      // Images
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      // Fonts
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
}
