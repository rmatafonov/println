const path = require('path')

const IS_DEV = process.env.NODE_ENV !== 'production'
const SRC_DIR = path.join(__dirname, '../src')
const DIST_DIR = path.join(__dirname, '../dist')
const UTILS_DIR = path.join(__dirname, '../src/utils')
const API_DIR = path.join(__dirname, '../src/api')
const COMPONENTS_DIR = path.join(__dirname, '../src/components')
const STYLES_DIR = path.join(__dirname, '../src/styles')
const PAGES_DIR = path.join(__dirname, '../src/pages')
const STATIC_DIR = path.join(__dirname, '../static')

export {
  IS_DEV,
  SRC_DIR,
  DIST_DIR,
  UTILS_DIR,
  API_DIR,
  COMPONENTS_DIR,
  STYLES_DIR,
  PAGES_DIR,
  STATIC_DIR,
}
