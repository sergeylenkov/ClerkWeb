module.exports = {
	module: {
		loaders: [
			{
				test: /\.js$/,
			    exclude: /(node_modules)/,
			    loader: 'babel',
			    query: {
			    	presets: ['es2015', 'es2016']
			    }
			},
		]
	},
			
	entry: './src/main.js',
	
  	output: {
    	filename: 'bundle.js',
		path: './dist'
  	}
}