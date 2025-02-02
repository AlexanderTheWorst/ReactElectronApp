const path = require('path');

module.exports = {
  entry: './src/index.jsx', // Entry point for your React app
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // Resolve .ts, .tsx, .js, .jsx extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',        // ESNext features
              '@babel/preset-react',      // React JSX
              '@babel/preset-typescript', // TypeScript
            ],
          },
        },
      },
    ],
  },
};
