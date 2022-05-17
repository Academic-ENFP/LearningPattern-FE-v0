const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    devServer: {
        static: path.resolve(__dirname, './src'), //contentBase에서 static으로 바뀜
        historyApiFallback: true
    },
    entry: {
        memo: path.resolve(__dirname, './src/components/LearningPage/Memo.js'),
        video: path.resolve(__dirname, './src/components/LearningPage/Video.js'),
        learningpage: path.resolve(__dirname, './src/components/LearningPage/Learningpage.js'),
        home: path.resolve(__dirname, './src/components/Home/Home.js'),
        result: path.resolve(__dirname, './src/components/Result/Result.js'),
        timestamp: path.resolve(__dirname, './src/components/Timestamp/Timestamp.js'),
        signin: path.resolve(__dirname, './src/components/Signin/signin.js'),
        app: path.resolve(__dirname, './src/App.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist/static/js'),
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
            template: './public/index.html', // public/index.html 파일을 읽는다.
            filename: 'index.html' // output으로 출력할 파일은 index.html 이다.
        }),
        new CleanWebpackPlugin()
    ],
    performance: { //mode 오류 제거
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
};