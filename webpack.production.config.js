/*我们应该新创建一个单独的config文件，因为部署上线使用webpack的时候
我们不需要一些dev-tools,dev-server和jshint校验等。
在package.json中添加一个build命令
*/
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件,“__dirname”是Node.js中的一个全局变量，它指向当前执行脚本所在的目录。
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "[name].min.js",//打包后输出文件的文件名
    chunkFilename: '[id].chunk.js'
  },

  module: {//在配置文件里添加JSON loader
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',//在webpack的module部分的loaders里进行配置即可
       },
       {
        test: /\.css$/,
        //loader: 'style!css'//添加对样式表的处理 感叹号的作用在于使同一文件能够使用不同类型的loader
      	//loader: 'style!css?modules',//跟前面相比就在后面加上了?modules 可以直接把CSS的类名传递到组件的代码中，且这样做只对当前组件有效，不必担心在不同的模块中具有相同的类名可能会造成的问题
      	//loader: 'style!css?modules!postcss' //使用PostCSS来为CSS代码自动添加适应不同浏览器的CSS前缀
      	loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
      }
    ],
    perLoaders: [
        {
            test: /\.jsx?$/,
            loader: 'jshint-loader'
        }
    ]
  },
  
  postcss: [
    require('autoprefixer')//调用autoprefixer插件
  ],

  plugins: [
    new webpack.BannerPlugin("Copyright Flying Unicorns inc."),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name].min.css"),
    new webpack.optimize.CommonsChunkPlugin,(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    //provide $, jQuery and window.jQuery to every script
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],

}