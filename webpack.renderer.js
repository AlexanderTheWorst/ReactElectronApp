const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
    entry: './src/index.jsx',  // Entry point for React app
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'renderer.js',  // React bundled output
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Make sure both .js and .jsx are handled
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',         // For ESNext features
                            '@babel/preset-react',       // For JSX support
                            '@babel/preset-typescript',  // For TypeScript (if using .ts/.tsx files)
                        ],
                    },
                },
            },
            {
                test: /\.tsx?$/,  // Ensure .ts/.tsx are handled by ts-loader
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',  // This generates a static HTML report
            reportFilename: 'bundle-report.html',  // Specify the output filename
            openAnalyzer: false,  // Don't automatically open the report in the browser
        })
        // new HtmlWebpackPlugin({
        //     template: './public/index.html',  // React app index.html
        // }),
    ],
    target: 'electron-renderer',  // Use 'electron-renderer' for the renderer process
    mode: process.env.NODE_ENV || 'development',
    node: {
        __dirname: false,  // Do not override __dirname
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
