const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'
// const HappyPack = require('happypack')
// const os = require('os')
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
console.log(devMode, process.env.NODE_ENV, 'devMode')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = {
  // 入口文件
  entry: {
    client: resolve('../src/client.js'),
  },
  output: {
    path: resolve('../dist'),
    filename: devMode ? 'js/[name].[hash].js' : 'js/[name].[contenthash].js',
    chunkFilename: devMode ? 'chunks/[name].[hash:4].js' : 'chunks/[name].[contenthash].js',
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src'),
    },
  },
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      name: true,
      automaticNameDelimiter: '~',
      cacheGroups: {
        default: {
          minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
          priority: -20, // 优先级
          reuseExistingChunk: true, // 默认使用已有的模块
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          // minChunks: 1,
          priority: -10,// 确定模块打入的优先级
          reuseExistingChunk: true,// 使用复用已经存在的模块
          enforce: true,//强制生成
        },
        // echarts: {
        //   test: /[\\/]node_modules[\\/]echarts/,
        //   name: 'echarts',
        //   priority: 16,
        //   reuseExistingChunk: true,
        // },
        // "draft-js": {
        //   test: /[\\/]node_modules[\\/]draft-js/,
        //   name: 'draft-js',
        //   priority: 18,
        //   reuseExistingChunk: true,
        // }
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        include: [resolve('../src/static/images')],
        loader: 'url-loader',
        options: {
          limit: 2 * 1024,
          name: '[name].[hash:4].[ext]',
          outputPath: 'img'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ]
  },
  // 配置相应的插件
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/style.css' : 'css/style.[contenthash].css',
      chunkFilename: devMode ? 'css/style.[id].css' : 'css/style.[contenthash].[id].css'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};

