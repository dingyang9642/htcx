var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlwebpackPlugin = require('html-webpack-plugin');  // 生成html文件

var ROOT_PATH = path.resolve(__dirname);
var embedFolder = path.resolve(ROOT_PATH, 'app/embed');
var adaptiveFileName = path.resolve(embedFolder, 'adaptive.js');
var adaptiveText = fs.readFileSync(adaptiveFileName, 'utf8');

var projectName = "htcx";
var agriAssetsFolder = '/assets/' + projectName + '/';
var agriTemplateFolder = '/template/' + projectName + '/';

// 定义当前是否处于开发debug阶段
var isDebug = JSON.stringify(JSON.parse(process.env.DEBUG || 'false'));

// 根据isDebug变量定义相关config变量
var configVarObj = {};
if(isDebug === 'true') {
    console.log('hey, man : I am in debuging............');
    configVarObj = {
        htmlPath: 'index.html',  // 定义输出html文件路径
        // devtool: 'cheap-source-map' // 生成sourcemap,便于开发调试
        devtool: 'eval' // 生成sourcemap,便于开发调试
    };
} else {
    console.log('hey, man : I am in releasing............');
    configVarObj = {
        htmlPath: './template/' + projectName + '/index.html',  // 定义输出html文件路径
        devtool: ''
    };
}


//自定义"魔力"变量
var definePlugin = new webpack.DefinePlugin({
    __DEV__: isDebug
});


module.exports = {
  context: path.join(__dirname, 'app'),
  // 获取项目入口JS文件
  entry: {
      app: './index.jsx',
      vendors: [
          'react',
          'react-dom',
          'react-router/lib/Router',
          'react-router/lib/browserHistory',
          'jquery'
      ]
  },
  output: {
    // 文件输出目录
    path: path.resolve(__dirname, 'output'),
    // 输出文件名
    filename: agriAssetsFolder + 'js/[name].min.js?[hash]',
    // cmd、amd异步加载脚本配置名称
    chunkFilename: agriAssetsFolder + 'js/[name].chunk.js?[hash]',
    publicPath: ''
  },
  module: {
    loaders:[
      {
        test: /\.css$/,
        exclude: /\.useable\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.useable\.css$/,
        exclude: /node_modules/,
        loader: "style-loader/useable!css-loader"
      },
      {
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
          test: /\.(png|jpg|gif)$/,
          loader: 'file-loader?name=/assets/' + projectName + '/img/[name]_[hash:8].[ext]'
      }
    ]
  },
  postcss: [
      autoprefixer
  ],
  // 生成sourcemap,便于开发调试
  devtool: configVarObj.devtool,
  // enable dev server
  devServer: {
      historyApiFallback: true,
      hot: false,
      inline: true,
      progress: true,
      // ajax 代理到5000端口
      proxy: {
          '/agri/interface/**': {
              target: 'http://127.0.0.1:5000',
              secure: false
          }
      },
      host: '0.0.0.0'
  },
  plugins: [
      new HtmlwebpackPlugin({
          title: 'Webpack-demos',
          template: path.join(__dirname, './app/index.html'),
          filename: configVarObj.htmlPath,
          minify: {
              minifyJS: true,
              removeComments: true,
              minifyCSS: true
          },
          adaptive: adaptiveText
      }),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      }),
      new webpack.optimize.CommonsChunkPlugin('vendors', agriAssetsFolder + 'js/[name].chunk.js?[hash]'),
      new webpack.ProvidePlugin({
         "$": "jquery"
      }),
      //定义全局变量
      definePlugin
  ]
};
