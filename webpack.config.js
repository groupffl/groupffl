const path = require('path');

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
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass'
        ]
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
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./src')
    ]
  },
  eslint: {
    configFile: ".eslintrc"
  }
}
