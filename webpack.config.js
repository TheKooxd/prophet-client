var webpack = require('webpack');
module.exports = {
    entry: [
      'webpack/hot/only-dev-server',
      "./js/app.js"
    ],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets:['es2015', 'react', 'stage-0'] }},
            { test: /\.css$/, loader: "style-loader!css" },
            { test: /\.(jpe?g|png|gif|svg)$/i, use: [ 'url-loader?limit=10000', 'img-loader']},
            { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]}
            ]
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ],
    devServer: {
      proxy: {
     '/api': {
       target: 'http://192.168.10.46:3000',
       pathRewrite: {'^/api' : ''},
       changeOrigin: true
     }
   },
   host : '192.168.10.46'
   }
};
