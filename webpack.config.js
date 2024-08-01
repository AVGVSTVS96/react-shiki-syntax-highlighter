var path = require('path');
const { alias } = require('refractor');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname),
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    publicPath: '/demo/build/',
    port: '9001',
    host: '0.0.0.0',
    compress: true,
    disableHostCheck: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      entrypoints: false
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    }
  },
  entry: {
    demo: './demo/index.js',
    prism: './demo/prism.js',
    diff: './demo/diff.js',
    shiki: './demo/shiki.js',
    virtualized: './demo/virtualized.js',
    prismAsyncLight: './demo/prism-async-light.js'
  },
  output: {
    path: path.resolve(__dirname, 'demo/build'),
    publicPath: 'build/',
    filename: '[name]-build.js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules\/(?!(shiki|@shikijs)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-nullish-coalescing-operator'
            ]
          }
        }
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/experimental'
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ],
  resolve: {
    extensions: ['.js', '.mjs', '.json']
  }
};
