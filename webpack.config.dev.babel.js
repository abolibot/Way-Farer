import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: './app/server.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'bundle.js',
  },
  plugins: [new webpack.IgnorePlugin(/^pg-native$/)],
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
