var webpack = require("webpack");
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {

	//页面入口文件配置
	entry: {
		index: "./html/js/index.js",
		newcommon: "./html/js/newcommon.js",
		qiandao: "./html/js/qiandao.js",
		vipupgrate: "./html/js/vipupgrate.js",
		classify: "./html/js/classify.js",
		newshops: "./html/js/newshops.js",
		logins: "./html/js/logins.js",
		personcenter: "./html/js/personcenter.js",
		certification: "./html/js/certification.js",
		applyshop: "./html/js/applyshop.js",
		goodscar: "./html/js/goodscar.js",
		goodlist: "./html/js/goodlist.js",
		choujiang: "./html/js/choujiang.js",
		cjindex: "./html/js/cjindex.js",
		nearby: "./html/js/nearby.js",
		indiana_index: "./html/js/indiana_index.js",
		shopnear: "./html/js/shopnear.js",
		prize: "./html/js/prize.js",
		product_info: "./html/js/product_info.js",
		reply: "./html/js/reply.js",
		reply_page: "./html/js/reply_page.js",
		card: "./html/js/card.js",
		hehuoren: "./html/js/hehuoren.js",
		custom: "./html/js/custom.js",
		partnerbenefits: "./html/js/partnerbenefits.js",
		appraise: "./html/js/appraise.js",
		inviter: "./html/js/inviter.js",
        tradingarea: "./html/js/tradingarea.js",
        bindphone: "./html/js/bindphone.js",
        bindphones: "./html/js/bindphones.js",
		recharge: "./html/js/recharge",
        chargeresult: "./html/js/chargeresult",
		newsearch: "./html/js/newsearch",
        shopdetail: "./html/js/shopdetail",
		newshopnear: "./html/js/newshopnear",
        specialshop: "./html/js/specialshop",
        mooncakebetting: "./html/js/mooncakebetting",
        mooncakegames: "./html/js/mooncakegames",
        banking: "./html/js/banking",
        yinpiaotreasure: "./html/js/yinpiaotreasure",
        valuabletreasure:"./html/js/valuabletreasure",
        financingproduct: "./html/js/financingproduct",
        payresult: "./html/js/payresult",
        mometary: "./html/js/mometary",
        freeday: "./html/js/freeday",
		wxlogin: "./html/js/wxlogin",
		zajindan: "./html/js/zajindan",
        newshoplist: "./html/js/newshoplist",
        shopmap: "./html/js/shopmap",
        findyoursister: "./html/js/findyoursister",
        findSomethingArea: "./html/js/findSomethingArea",
        listOfWinners: "./html/js/listOfWinners",
		feedback: "./html/js/feedback",
		moongoodlist: "./html/js/moongoodlist",
        gamedemo: "./html/js/gamedemo",
        teachersday: "./html/js/teachersday"
	},
	output: {
		filename: "[name]-[chunkhash:10].js"
		// filename: "[name].js"
	},
	module: {
		// rules: [
		// 	{
		// 		test: /\.css$/,
		// 		use: [
		// 			{ loader: "style-loader" },
		// 			{
		// 				loader: "css-loader",
		// 				options: {
		// 					modules: true
		// 				}
		// 			}
		// 		]
		// 	},
		// 	{
		// 		test:/\.scss$/,
		// 		use: [
		// 			"style-loader",
		// 			"css-loader",
		// 			"sass-loader"
		// 		],
		// 		exclude: /node_modules/
		// 	},
		// 	//加载图片
		// 	{
		// 		test: /\.(png|jpg|gif)$/,
		// 		loader: "url-loader",
		// 		options: {
		// 			//把较小的图片转换成base64的字符串内嵌在生成的js文件中
		// 			limit: 8192
		// 		}
		// 	}
		// ]
	},
	plugins: [
		new ManifestPlugin({
			fileName: 'js-manifest.json',
			path: "./js/"
		})
	]
}