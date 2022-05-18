const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const config = require('./webpack.config');

module.exports = merge(config, {
	mode: 'development',
	devtool: 'eval',
	devServer: {
		compress: true,
		historyApiFallback: true,
		hot: true,
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
		},
		host: 'local-ipv4',
		open: true,
		port: 4000,
		proxy: [{
			context: ['/painel'],
			target: 'http://localhost:3000/',
			secure: false,
			changeOrigin: true
		}]
	},
	plugins: [
		new ESLintPlugin({
			extensions: ['jsx', 'js']
		})
	]
});