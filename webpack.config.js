/**
 * Created by mikepugh on 1/22/16.
 */
module.exports = {
	entry: [
		'./src/index.jsx'
	],
	devtool: "source-map",
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel'
		}]
	},
	resolve: {
		extensions: ['','.js','.jsx']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: './dist'
	}
}
