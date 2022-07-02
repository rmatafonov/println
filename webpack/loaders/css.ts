const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const { IS_DEV } = require('../env')

export default {
  client: {
    test: /\.css$/,
    use: [
      // IS_DEV && 'css-hot-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      { loader: 'postcss-loader', options: { sourceMap: true } },
    ].filter(Boolean),
  },
  server: {
    test: /\.css$/,
    loader: 'null-loader',
  },
}
