const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const environment = require('./configuration/environment');

const templateFiles = fs
  .readdirSync(environment.paths.source)
  .filter((file) => ['.html', '.ejs'].includes(path.extname(file).toLowerCase()))
  .map((filename) => ({
    input: filename,
    output: filename.replace(/\.ejs$/, '.html'),
  }));

const htmlPluginEntries = templateFiles.map(
  (template) =>
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: template.output,
      template: path.resolve(environment.paths.source, template.input),
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
    })
);

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'js', 'app.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: environment.paths.output,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/resized/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|webp)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true, quality: 80 },
              optipng: { optimizationLevel: 5 },
              pngquant: { quality: [0.6, 0.8], speed: 4 },
              webp: { quality: 80 },
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/design/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:6][ext]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              webp: { quality: 80 },
              jpeg: { quality: 80 },
              png: { quality: 80 },
            },
          },
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, 'images'),
          to: path.resolve(environment.paths.output, 'images'),
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
        {
          from: path.resolve(environment.paths.source, 'videos'),
          to: path.resolve(environment.paths.output, 'videos'),
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
      ],
    }),
  ].concat(htmlPluginEntries),
  target: 'web',
};
