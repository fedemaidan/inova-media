const procesarJson = require('./procesarJson')

module.exports = (jsonArray, desde, hasta) => {
	for (var i = desde; i < hasta; i++) {
		var json = jsonArray[i]
		procesarJson(json,i,jsonArray, i+1 == hasta)
	}	
}