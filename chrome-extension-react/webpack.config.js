const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './src'), //contentBase에서 static으로 바뀜
        historyApiFallback: true
    },
    entry: {
        popup: path.resolve(__dirname, './src/popup.jsx'),
        options: path.resolve(__dirname, './src/options.jsx'),
        foreground: path.resolve(__dirname, './src/foreground.jsx'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader', 
                    options: { 
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react',
                            {
                                'plugins': ['@babel/plugin-proposal-class-properties']
                            }
                        ]
                    }
                }
            },
            {
                test:/\.html$/,
                use: ['html-loader']
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ 
            template: './src/popup.html',
            filename: 'popup.html',
            chunks: ['popup']
        }),
        new HtmlWebpackPlugin({ 
            template: './src/options.html',
            filename: 'options.html',
            chunks: ['options']
        }),
        new HtmlWebpackPlugin({ 
            template: './src/foreground.html',
            filename: 'foreground.html',
            chunks: ['foreground']
        }),
        new CopyPlugin({ // build할 때 경로에 있는 파일을 dist 폴더에 복사하기 위한 plugin
            patterns: [
              { from: 'public/manifest.json', to: '[name][ext]' },
              { from: 'src/background.js', to: '[name][ext]' },
              { from: 'src/inject_script.js', to: '[name][ext]' },
            ],
        }),
        new CleanWebpackPlugin()
    ],
    performance: { //mode 오류 제거
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
};