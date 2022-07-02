const fileRegex = /^(?!.*\.inline).*\.(svg|jpe?g|png|gif|eot|woff2?|ttf)$/

export default {
  client: [
    { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
    // Fonts
    { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
  ],
  server: {
    loader: 'null-loader',
    test: fileRegex,
  },
}
