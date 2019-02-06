module.exports = {
  preserveWhitespace: false,
  cssSourceMap: false,
  loaders: {
    css: [
      { loader: 'vue-style-loader', options: { sourceMap: false } },
      { loader: 'css-loader', options: { importLoaders: 1, minimize: true, sourceMap: false } },
      { loader: 'postcss-loader', options: { sourceMap: false } }
    ]
  }
}
