const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

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
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'public/', to: '', globOptions: { ignore: ['index.html'] } },
                { from: 'src/electron/preload.js', to: 'preload.js' }
            ],
        }),
    ],
    mode: process.env.NODE_ENV || 'development',
    node: {
        __dirname: false,  // Ensures that __dirname is not overridden
    },
    optimization: {
        usedExports: true, // Enables tree-shaking
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // Remove console logs
                    },
                },
            }),
        ],
    }
};
