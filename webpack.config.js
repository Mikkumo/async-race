const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
    entry: path.resolve(__dirname, './src/index.ts'),
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./src/index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
              { from: path.resolve('src/assets'), to: path.resolve('dist/assets') },
              { from: path.resolve('src/pages'), to: path.resolve('dist/pages') },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/i,
                loader: 'ts-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin()); 
    } else {
        config.mode = 'development';
    }
    return config;
};