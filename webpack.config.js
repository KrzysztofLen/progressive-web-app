const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

const config = {
	entry: [
		path.resolve(__dirname, 'public/src/index.js')
	],
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].bundle.js'
	},
	watch: true,
	resolve: { // These options change how modules are resolved
		extensions: [ '.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png' ], // Automatically resolve certain extensions
		alias: { // Create aliases
			images: path.resolve(__dirname, 'public/src/images/')  // src/assets/images alias
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [ 'css-hot-loader' ].concat(ExtractTextWebpackPlugin.extract({
					fallback: 'style-loader',
					use: [ {
						loader: 'css-loader',
						options: {
							minimize: true
						}
					}, 'postcss-loader' ]
				}))
			},
			{
				test: /\.scss$/,
				use: [ {
					loader: 'style-loader' // creates style nodes from JS strings
				}, {
					loader: 'css-loader' // translates CSS into CommonJS
				}, {
					loader: 'sass-loader' // compiles Sass to CSS
				}, {
					loader: 'postcss-loader' // creates style nodes from JS strings
				} ]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [ 'file-loader?name=/dist/img/[name].[ext]', {  // images loader folder output
					loader: 'image-webpack-loader',
					query: {
						mozjpeg: {
							progressive: true,
							quality: 65
						},
						gifsicle: {
							interlaced: false,
						},
						optipng: {
							optimizationLevel: 5,
						},
						pngquant: {
							quality: '65-70',
							speed: 3,
						},
					},
				} ],
				exclude: /node_modules/,
				include: __dirname,
			},
		] // end rules
	},
	plugins: [
		new ExtractTextWebpackPlugin('dist/styles.css'),
		new webpack.optimize.UglifyJsPlugin()
	],
	devServer: {
		port: 3002,
		contentBase: path.resolve(__dirname, 'public'),
		historyApiFallback: true,
		inline: true,
		open: true
	},
	devtool: 'eval-source-map'
};

module.exports = config;

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
		new OptimizeCSSAssets()
	);
}
