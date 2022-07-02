// import { IS_DEV } from '../env'

export default {
  client: {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: { loader: 'babel-loader' },
  },
  server: {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: [
          // IS_DEV && 'react-refresh/babel',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-syntax-dynamic-import',
          '@loadable/babel-plugin',
        ].filter(Boolean),
      },
    },
  },
}
