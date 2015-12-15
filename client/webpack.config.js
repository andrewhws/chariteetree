var path = require("path");
module.exports = {
  entry: ["./js/index.js","./js/orgIndex.js", "./js/donorIndex.js"],
  output: {
    path: path.join(__dirname, "js/dist"),
    filename: "[name].dist.js"
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['react']}},
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
};

//var path = require("path");
//var webpack = require('webpack');
//module.exports = {
//  devtool: 'eval',
//  entry: [
//    'webpack-dev-server/client?http://localhost:4000', // WebpackDevServer host and port
//    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
//    "./js/index.js"
//  ],
//  output: {
//    path: path.join(__dirname, "js/dist"),
//    filename: "[name].dist.js",
//    publicPath: '/client/'
//  },
//  module: {
//    loaders: [{
//      test: /\.jsx?$/,
//      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
//      include: path.join(__dirname, 'js'),
//      exclude: /node_modules/
//    },
//      {
//        test: /\.css$/,
//        loader: 'style!css'
//      }]
//  },
//  plugins: [
//    new webpack.HotModuleReplacementPlugin()
//  ]
//};