const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist')

const CONTEXT_PATH = path.resolve(__dirname, '../')
const ENTRY_PATH = path.resolve(CONTEXT_PATH, 'src')
const isProd = process.env.NODE_ENV === 'production'

const cssLoaderConfig = {
  loader: 'css-loader',
  options: {
    modules: {
      mode: 'local',
      // .vue should open CSS Modules
      // .css or .less open CSS Modules when extension include '.module' prefix
      auto: /(\.module\.(css|less)|.vue)$/,
      exportGlobals: true,
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
      localIdentContext: ENTRY_PATH,
      localIdentHashSalt: 'cesarlai',
      exportLocalsConvention: 'camelCase',
      exportOnlyLocals: false
    }
  }
}

const lessLoaderConfig = {
  loader: 'less-loader',
  options: {
    lessOptions: {
      javascriptEnabled: true
    }
  }
}

const miniCssLoaderConfig = MiniCssExtractPlugin.loader

module.exports = {
  context: CONTEXT_PATH,
  target: 'web',
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        include: ENTRY_PATH,
        exclude: path.resolve(CONTEXT_PATH, 'node_modules'),
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        include: ENTRY_PATH,
        exclude: path.resolve(CONTEXT_PATH, 'node_modules'),
        loader: 'vue-loader',
        options: {
          hotReload: true
        }
      },
      // common css
      {
        test: /\.(css|less)$/,
        include: ENTRY_PATH,
        exclude: path.resolve(CONTEXT_PATH, 'node_modules'),
        use: [
          isProd ? miniCssLoaderConfig : 'vue-style-loader',
          cssLoaderConfig,
          lessLoaderConfig
        ].filter(Boolean)
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        include: ENTRY_PATH,
        exclude: path.resolve(CONTEXT_PATH, 'node_modules'),
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'static/[name].[contenthash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // polyfill for process in web app
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public/vite.svg', to: './' }]
    }),
    new TsconfigPathsPlugin({
      configFile: path.resolve(CONTEXT_PATH, 'tsconfig.json')
    })
  ],
  resolve: {
    alias: {
      '@': ENTRY_PATH
    },
    modules: [ENTRY_PATH, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
    fallback: {
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/')
    }
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true
  }
}
