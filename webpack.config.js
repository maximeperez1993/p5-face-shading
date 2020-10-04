const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanPlugin = require('webpack-clean-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'src/index.html', to: './index.html'
        }]),
        new WebpackCleanPlugin({
            path: './dist'
        }),
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        disableHostCheck: true,
    }
}
module.rules = [
    {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    }
];
