

const webpack = require('webpack');

module.exports = {
	entry: __dirname + '/app/client/production.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/app/dist'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
			include: __dirname + '/app/client'
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') }
		})
	]
};

