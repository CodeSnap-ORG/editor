// patch 'fs' to fix EMFILE errors, for example on WSL
var realFs = require("fs");
var gracefulFs = require("graceful-fs");
gracefulFs.gracefulify(realFs);

var CopyWebpackPlugin = require("copy-webpack-plugin");
var path = require("path");

module.exports = [
  {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: {
      vertical: "./shim/vertical.js",
    },
    output: {
      library: "ScratchBlocks",
      libraryTarget: "commonjs2",
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          include: path.resolve("src"),
          test: /\.js$/,
          loader: "esbuild-loader",
          options: {
            loader: "js",
            target: "es2020", // Using an older version because blocks is ancient and uses ancient build tools.
          },
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    performance: {
      hints: false,
    },
  },
  {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: {
      // horizontal entry removed
      vertical: "./shim/vertical.js",
    },
    output: {
      library: "Blockly",
      libraryTarget: "umd",
      path: path.resolve(__dirname, "dist", "web"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          include: path.resolve("src"),
          test: /\.js$/,
          loader: "esbuild-loader",
          options: {
            loader: "js",
            target: "es2015",
            minify: true, // esbuild-loader has built-in minification
          },
        },
      ],
    },
    optimization: {
      // UglifyJsPlugin is replaced by esbuild-loader's built-in minification.
      minimize: true,
    },
    plugins: [],
  },
  {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: "./shim/gh-pages.js",
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "gh-pages"),
    },
    module: {
      rules: [
        {
          include: [
            path.resolve("src"),
            path.resolve("node_modules", "scratch-render-fonts"),
          ],
          test: /\.js$/,
          loader: "esbuild-loader",
          options: {
            loader: "js",
            target: "es2015",
          },
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    performance: {
      hints: false,
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: "../../node_modules/google-closure-library",
          to: "closure-library",
        },
        {
          from: "blocks_common",
          to: "playgrounds/blocks_common",
        },
        {
          from: "blocks_vertical",
          to: "playgrounds/blocks_vertical",
        },
        {
          from: "core",
          to: "playgrounds/core",
        },
        {
          from: "media",
          to: "playgrounds/media",
        },
        {
          from: "msg",
          to: "playgrounds/msg",
        },
        {
          from: "tests",
          to: "playgrounds/tests",
        },
        {
          from: "*.js",
          ignore: "webpack.config.js",
          to: "playgrounds",
        },
      ]),
    ],
  },
];