const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');
const webpackConfigBase = require('./webpack.config.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const Copy = require('copy-webpack-plugin')

function resolve(relatedPath) {
	return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
	mode: 'production',
	output: {
		publicPath: './',
	},
	devtool: 'cheap-module-souce-map',
	optimization: {
		minimizer: [
			new TerserJSPlugin({ // 多进程压缩
				// 设置缓存目录
				cache: path.resolve('.cache'),
				parallel: 4,// 开启多进程压缩
				terserOptions: {
					compress: {
						drop_console: true,
					},
				},
			}),
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			IS_DEVELOPMETN: false,
		}),
		new HtmlWebpackPlugin({
			template: resolve('../public/index.html'),
			dlls: [],
		}),
		new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
		new Copy([]),
		new OptimizeCSSAssetsPlugin(),
		new CleanWebpackPlugin(),
	],
}


module.exports = merge(webpackConfigBase, webpackConfigProd)