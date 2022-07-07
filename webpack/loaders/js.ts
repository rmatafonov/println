import { IS_DEV } from '../env'

export default {
  client: {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          '@babel/preset-react',
        ],
        plugins: [IS_DEV && 'react-refresh/babel'].filter(
          Boolean
        ),
      },
    },
  },
  server: {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  },
}
