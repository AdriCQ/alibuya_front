const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin(),
    new VuetifyLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader'
      }
      // ...
    ]
  },
}