const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    target: 'electron-main', // Webpack target for Electron's main process
    entry: './src/electron/electron.main.js', // Main entry point for Electron's main process
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: process.env.NODE_ENV || 'development',
    node: {
        __dirname: false,  // Ensures that __dirname is not overridden
    }, 
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // Optional: remove console.logs
                    },
                },
            }),
        ],
    },
};
