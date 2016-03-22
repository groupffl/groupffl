const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  inject: 'body'
});

module.exports = {
  entry: "./src/index.js",
  cache: true,
  debug: true,
  devtool: "source-map",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ["source-map-loader"]
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ["uglify", "babel"],
        "uglify-loader": {
          mangle: true
        }
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig
  ]
}
