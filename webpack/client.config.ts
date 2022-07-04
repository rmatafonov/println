import path from 'path'
import {
  Configuration, HotModuleReplacementPlugin, WebpackPluginInstance as Plugin, Entry
} from 'webpack'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import LoadablePlugin from '@loadable/webpack-plugin'
// import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import {
  IS_DEV,
  DIST_DIR,
  SRC_DIR,
  UTILS_DIR,
  API_DIR,
  COMPONENTS_DIR,
  STYLES_DIR,
  PAGES_DIR,
} from './env'
import fileLoader from './loaders/file'
import cssLoader from './loaders/css'
import jsLoader from './loaders/js'

const config: Configuration = {
  entry: [
    // IS_DEV && '@gatsbyjs/webpack-hot-middleware/client?path=/__webpack_hmr',
    // IS_DEV && 'webpack-hot-middleware/client',
    // IS_DEV && 'css-hot-loader/hotModuleReplacement',
    path.join(SRC_DIR, 'client.tsx'),
  ].filter(Boolean) as unknown as Entry,
  module: {
    rules: [...fileLoader.client, cssLoader.client, jsLoader.client],
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    alias: {
      '@': SRC_DIR,
      build: DIST_DIR,
      utils: UTILS_DIR,
      api: API_DIR,
      components: COMPONENTS_DIR,
      styles: STYLES_DIR,
      pages: PAGES_DIR,
    },
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  plugins: [
    IS_DEV && new HotModuleReplacementPlugin(),
    // IS_DEV && new ReactRefreshPlugin({
    //   overlay: {
    //     sockIntegration: 'whm',
    //   },
    // }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    !IS_DEV && new CompressionPlugin(),
    new LoadablePlugin(),
  ].filter(Boolean) as Plugin[],

  devtool: 'source-map',

  performance: {
    hints: IS_DEV ? false : 'warning',
  },
}

export default config
