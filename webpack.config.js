const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const pages = ["index", /*"collection", "nominees", "winners","submit","profile","sites"*/];

const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
  entry: [
    './src/index.js',
    './src/assets/scss/main.scss',
    './src/assets/scss/pages/collection.scss',
    './src/assets/scss/pages/nominees.scss',
    './src/assets/scss/pages/winners.sass',
    './src/assets/scss/pages/home.scss',
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/[name].js",
    chunkFilename: "assets/js/[name].[id].js",
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.bundle\.js$/,
        use: {
          loader: 'bundle-loader',
          options: {
            lazy: true,
            name: 'chunk'
          }
        }
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader']
      },
      
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true,
              name: 'images/[sha512:hash:base64:7].[ext]',
              publicPath: '../',
              outputPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true,
              name: 'assets/images/[sha512:hash:base64:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[sha512:hash:base64:7].[ext]',
              publicPath: '../',
              outputPath: 'assets/',
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return (
                  path.relative(
                    path.dirname(resourcePath),
                    context
                  ) + "/"
                );
              }
            }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ]
      },
      
    ],
  },
  
  plugins: [
    ...pages.map(page => new HtmlWebpackPlugin({
      template: "./src/" + page + ".pug",
      filename: page + ".html",
      title: 'Project',
      inject: true,
      hash: true,
      minify: {
        // removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        removeComments: true,
        removeEmptyAttributes: true,
        minifyCSS: true
      }
    })),
    new MiniCssExtractPlugin({
      filename: devMode ? 'assets/css/[name].css' : 'assets/css/[name].[hash].css',
      chunkFilename: devMode ? 'assets/css/[id].css' : 'assets/css/[id].[hash].css',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer()
        ]
      }
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
  ],
};