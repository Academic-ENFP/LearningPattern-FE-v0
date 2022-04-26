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
        memo: path.resolve(__dirname, './src/memo.jsx'),
        video: path.resolve(__dirname, './src/video.jsx'),
        learningpage: path.resolve(__dirname, './src/learningpage.jsx'),
        home: path.resolve(__dirname, './src/home.jsx'),
        result: path.resolve(__dirname, './src/result.jsx'),
        timestamp: path.resolve(__dirname, './src/timestamp.jsx'),
        signin: path.resolve(__dirname, './src/signin.jsx'),
        app: path.resolve(__dirname, './src/app.jsx')
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
        new HtmlWebpackPlugin({
            template: './src/memo.html',
            filename: 'memo.html',
            chunks: ['memo']
        }),
        new HtmlWebpackPlugin({
            template: './src/video.html',
            filename: 'video.html',
            chunks: ['video']
        }),
        new HtmlWebpackPlugin({
            template: './src/learningpage.html',
            filename: 'learningpage.html',
            chunks: ['learningpage']
        }),
        new HtmlWebpackPlugin({
            template: './src/home.html',
            filename: 'home.html',
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            template: './src/result.html',
            filename: 'result.html',
            chunks: ['result']
        }),
        new HtmlWebpackPlugin({
            template: './src/signin.html',
            filename: 'signin.html',
            chunks: ['signin']
        }),
        new HtmlWebpackPlugin({
            template: './src/timestamp.html',
            filename: 'timestamp.html',
            chunks: ['timestamp']
        }),
        new HtmlWebpackPlugin({
            template: './src/app.html',
            filename: 'app.html',
            chunks: ['app']
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