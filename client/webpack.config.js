const path = require("path")
const webpack = require("webpack")
const dotenv = require("dotenv")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const dotenvConfig = dotenv.config().parsed || {}
const env = { ...dotenvConfig, ...process.env }

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

const isDevelopment = ["development", "test", "e2e"].includes(process.env.NODE_ENV || "development")

const initialEntryPoints = isDevelopment ? ["webpack-hot-middleware/client?reload=true"] : []

let reactDomAlias = {}
if (isDevelopment) {
  reactDomAlias = {
    "react-dom": "@hot-loader/react-dom",
  }
}

module.exports = {
  entry: [...initialEntryPoints, path.join(__dirname, "./src/main.js")],
  context: path.resolve(__dirname),
  devtool: isDevelopment ? "source-map" : false,
  mode: isDevelopment ? "development" : "production",
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
    new HtmlWebpackPlugin({
      title: "Engage",
      template: path.join(__dirname, "public/index.template.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"], cwd: path.resolve(__dirname) },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDevelopment,
              esModule: true,
              hmr: isDevelopment,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.(s(a|c)ss)$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      ...reactDomAlias,
      "@Components": path.resolve(__dirname, "src/components/"),
      "@Providers": path.resolve(__dirname, "src/providers/"),
    },
    extensions: ["*", ".js", ".scss", ".css"],
    fallback: {
      process: require.resolve("process/browser"),
    },
  },
  output: {
    path: path.resolve(__dirname, "../server/public/dist"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    historyApiFallback: true,
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
    proxy: [
      {
        context: ["/auth", "/api"],
        target: "http://localhost:4000",
      },
    ],
  },
}
