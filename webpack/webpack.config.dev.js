const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');
const webpackConfigBase = require('./webpack.config.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')


function resolve(relatedPath) {
	return path.join(__dirname, relatedPath)
}

const webpackConfigDev = {
	mode: 'development',
	plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.APP_BASE_API': JSON.stringify('/cms/'),
      IS_DEVELOPMETN: true,
    }),
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      dlls: [],
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'source-map',
  devServer: {
    contentBase: resolve('../src'),
    historyApiFallback: false,
    open: true,
    hot: true,
    port: 1207,
    // 代理服务器配置
    proxy: {
      '/cms': {
        target: 'http://localhost:9527',
        changeOrigin: true,
        pathRewrite: {
          '^/cms': '/cms'
        }
      },
    }
  },

}

module.exports = merge(webpackConfigBase, webpackConfigDev)