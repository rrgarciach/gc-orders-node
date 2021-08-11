const path = require('path');
const slsw = require('serverless-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const entries = {};

Object.keys(slsw.lib.entries).forEach(
  key => (entries[key] = ['./source-map-install.js', slsw.lib.entries[key]])
);

module.exports = {
  devtool: 'source-map',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  externals: [nodeExternals()],
  target: 'node',
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, path.resolve(__dirname, 'test')],
        loader: 'babel-loader',
        options: {
          plugins: [
            '@babel/plugin-proposal-async-generator-functions',
            '@babel/proposal-class-properties',
            'transform-modern-regexp',
          ],
          presets: [
            [
              '@babel/preset-env', {
              useBuiltIns: 'usage',
              corejs: '2',
              shippedProposals: true,
              targets: {
                node: 'current',
              },
              modules: 'commonjs',
            },
            ],
            '@babel/preset-typescript',
          ],
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'migrations/**/*.js',
          to: '.',
        },
        {
          from: 'node_modules/typedorm',
          to: './node_modules',
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
};
