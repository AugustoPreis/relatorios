const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	output: {
		path: path.resolve(__dirname, '../backend/dist'),
		filename: 'bundle.js',
		chunkFilename: 'chunk[name].js',
		publicPath: '/painel',
		clean: true
	},
	module: {
		rules: [{
			test: /\.jsx|js?$/,
			exclude: /node_modules\/(?!consys$)/,
			use: [
				{
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							'@babel/plugin-proposal-object-rest-spread',
							["import", { libraryName: "antd", style: true }]
						],
						compact: false
					}
				}]
		},
		{
			test: /\.css$/,
			exclude: [
				path.resolve(__dirname, 'node_modules/react-datepicker/dist/react-datepicker.css'),
				path.resolve(__dirname, 'node_modules/react-big-calendar/lib/css/react-big-calendar.css')
			],
			use: [
				"style-loader",
				{
					loader: "css-loader",
					options: {
						modules: true
					},
				}
			],
		},
		{
			test: [
				/node_modules[\\/]react-datepicker[\\/]dist[\\/]react-datepicker\.css/,
				/node_modules[\\/]react-big-calendar[\\/]lib[\\/]css[\\/]react-big-calendar\.css/,
			],
			use: [
				{
					loader: "style-loader"
				}, {
					loader: "css-loader",
				}]
		},
		{
			test: /\.less$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}, {
				loader: "less-loader",
				options: {
					lessOptions: {
						modifyVars: {
							"primary-color": "#00adb8",
							"font-size-base": "13px"
						},
						javascriptEnabled: true
					},
				}
			}]
		},
		{
			test: /\.(png|jpe?g|svg|gif)$/,
			type: 'asset/resource'
		}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
			minify: false
		})
	]
}