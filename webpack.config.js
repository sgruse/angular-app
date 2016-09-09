'use strict';

let webpack = require('webpack');
let CleanPlugin = require('clean-webpack-plugin');
let ExtractPlugin = require('extract-text-webpack-plugin');
let production = process.env.NODE_ENV === 'production';

const PATHS = {
  entry: __dirname + '/frontend/src/entry',
  build: `${__dirname}/builds`
}

let plugins = [
  new ExtractPlugin('bundle.css'),
  new CleanPlugin('builds'),
  new webpack.DefinePlugin({
    __SERVER__:      !production,
    __DEVELOPMENT__: !production,
    __DEVTOOLS__:    !production,
    'process.env':   {
      BABEL_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name:      'main', // Move dependencies to our main file
    children:  true, // Look for common dependencies in all children,
    minChunks: 2 // How many times a dependency must come up before being extracted
  }),
];


// POSSIBLE ISSUES HAPPENING WITH THIS
if (production) {
  plugins = plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200, // ~50kb
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle:   true,
      compress: {
        warnings: false, // Suppress uglification warnings
      },
    }),
    new webpack.DefinePlugin({
      __SERVER__:      !production,
      __DEVELOPMENT__: !production,
      __DEVTOOLS__:    !production,
      'process.env':   {
        BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ])
};

module.exports = {
  debug:   !production,
  devtool: production ? false : 'eval',
  entry: PATHS.entry,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
    // chunkFilename: '[name]-[chunkhash].js'
    // publicPath: 'builds/'
  },
  devServer: {
    contentBase: PATHS.build,
    progress: true,
    status: 'errors-only'
  },
  plugins: plugins,

  module: {
    preLoaders: [
      // {
      //   test: /\.js$/,
      //   loader: 'eslint',
      // },
      {
        test:   /index\.js$/,
        // load the styles into all of the entry files, should be pulled out by the text extract into bundle.css
        loader: 'baggage?[dir].scss'
      },
    ],
    loaders: [
      {
          test: /\.scss$/,
          loader: ExtractPlugin.extract('style', 'css!sass', { allChunks: true })
      },
      {
        test:     /\.css$/,
        loader:   ExtractPlugin.extract('style', 'css!postcss', { allChunks: true }),
      },
      {
          test:    /\.js$/,
          loader:  'babel',
          include: `${__dirname}/src`
      },
      // {
      //     test: /\.js$/,
      //     loader: 'baggage?[file].html=template&[file].scss',
      // },
      {
          test: /\.(png|gif|jpe?g|svg)$/i,
          loader: 'url?limit=10000'
      },
      // {
      //     test:   /\.(png|gif|jpe?g|svg)$/i,
      //     loader: 'url',
      //     query: {
      //     limit: 10000,
      //   }
      // },
      {
          test:   /\.html$/,
          loader: 'html'
      },
      {
        test:     /\.(ttf|eot)$/,
        loader:   'file'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  stats: {
    reasons: true,
    errorDetails: true
  }
};
