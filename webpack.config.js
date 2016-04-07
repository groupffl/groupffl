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
        test: /\.(jpeg|png|gif|svg)$/i,
        loader:'file'
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
  eslint: {
    configFile: ".eslintrc"
  }
}
