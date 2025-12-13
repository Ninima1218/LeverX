const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true
  },
  resolve: { extensions: [".ts", ".tsx", ".js", ".jsx"] },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.s[ac]ss$/i, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: "asset/resource",
        generator: { filename: "assets/images/[name][ext]" }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: { filename: "assets/fonts/[name][ext]" }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      inject: "body"
    })
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true,
    client: { overlay: true },
    proxy: { "/api": "http://localhost:3001" }
  },
  devtool: "source-map"
};
