let webpack = require('webpack');
let devServer=require('webpack-dev-server');
let path = require('path');
module.exports = {
    entry: {
        // 'pageB': './src/pageB',
        // 'vendor':['lodash'],
        app: './app.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    devServer:{
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port:3000,
        host: "0.0.0.0",
        https:true,
        proxy:{
            '/fcgi-bin/*':{
                target:'https://api.ai.qq.com/',
                changeOrigin:true,
            }
        }
    },
    // externals:{
    //   'webcamjs':path.resolve(__dirname,'webcam.js')
    // },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: 'es2015',
                    plugins: ['syntax-dynamic-import']
                }
            }]
        }]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     async: 'async-common',
        //     children:true,
        //     minChunks: 2
        // })
    ],
}
