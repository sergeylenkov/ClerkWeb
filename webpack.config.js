var webpack = require("webpack");

module.exports = {
	module: {
		loaders: [
			{
				test: /\.js$/,
			    exclude: /(node_modules)/,
			    loader: "babel",
			    query: {
			    	presets: ["es2015", "es2016"]
			    }
			},
			{
                test: /\.css$/,
				loaders: [
        			"style?sourceMap",
        			"css?modules&importLoaders=1&localIdentName=[folder]___[name]__[local]"
    			]
            },
		]
	},

	entry: "./src/main.js",

  	output: {
    	filename: "bundle.js",
		path: "./dist"
	},

	devtool: "source-map"
}
