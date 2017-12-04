var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {

  context: path.join(__dirname, './client-src'),

  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './index.js'
  ],

  output: {
    path: path.join(__dirname, './client-build'),
    filename: 'bundle.js',
    publicPath: '/hot'
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        babelsrc: false,
        include: path.join(__dirname, './client-src'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: [['transform-class-properties']]
        }
      },
	  { 
        test: /\.css$/, 
		loader: ExtractTextPlugin.extract(
		  'style-loader', 
		  'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
		) 
	  },
      {
        test: /\.svg$/, 
		loader: "url-loader?limit=10000&mimetype=image/svg+xml" 
	  }
    ]
  },

  postcss: [
    require('autoprefixer-core')
  ],    

  resolve: {
    modulesDirectories: ['node_modules', 'components']
  },    

  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};
