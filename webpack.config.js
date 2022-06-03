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
        popupSignedIn: path.resolve(__dirname, './src/popupSignedIn.jsx'),
        learningpage: path.resolve(__dirname, './src/learningpage.jsx'),
        background: path.resolve(__dirname, './src/background.js'),
        injectedScript: path.resolve(__dirname, './src/injectedScript.js')
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
            template: './src/popupSignedIn.html',
            filename: 'popupSignedIn.html',
            chunks: ['popupSignedIn']
        }),
        new HtmlWebpackPlugin({ 
            template: './src/learningpage.html',
            filename: 'learningpage.html',
            chunks: ['learningpage']
        }),
        new CopyPlugin({ // build할 때 경로에 있는 파일을 dist 폴더에 복사하기 위한 plugin
            patterns: [
              { from: './src/manifest.json', to: '[name][ext]' },
            ],
        }),
        new CleanWebpackPlugin()
    ],
    performance: { //mode 오류 제거
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
};