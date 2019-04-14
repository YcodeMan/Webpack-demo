const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
	
	entry: __dirname + "/app/main.js",
	output: {
		path: __dirname + "/build/",
		filename: "bundle-[hash].js"
	},
	devtool: 'none',
	devServer: {
		contentBase: "./build",
		historyApiFallback: true,
		inline: true,
		hot: true
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin('版本所有'),
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		
		new ExtractTextPlugin("style.css"),
		new CleanWebpackPlugin({
		  root: __dirname,
		  verbose: true,
		  dry: false
		})
	],
	 optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    },
}