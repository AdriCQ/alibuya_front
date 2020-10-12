const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin(),
    new VuetifyLoaderPlugin()
  ]
}