const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/js/main.ts',

    devtool: 'inline-source-map', // dev
    devServer: {
        static: './demo',
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Swiper ease',
            template: 'src/index.html'
        }),
    ],
    
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'demo'),
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
                type: 'asset/resource'
            },

            {
                test:/\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};