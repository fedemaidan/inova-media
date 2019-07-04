const csv= require('csvtojson')
const fs = require('fs')

const setUltimaCantidad = require('./setUltimaCantidad')

const procesarJsonArray = require('./procesarJsonArray')


module.exports = async(filePath) => {
	
	fs.writeFile("cargas/errores.csv", "Elemento,Razon,Error sistema", (err) => {
	  if (err) console.log(err);
		console.log("Init errores");
	})

	fs.writeFile("cargas/estado.csv", "Elemento,Estado", (err) => {
	  if (err) console.log(err);
		console.log("Init estado");
	})

	var input = await fs.createReadStream(filePath, 'utf8')
	var jsonArray = await csv({delimiter: ','}).fromStream(input)
	var enviadas = 0

	var csvFileHead = "SKU, TITULO, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10\n" 
	fs.writeFile("cargas/ultima.csv", csvFileHead, "utf8", (err) =>{ if (err) console.log(err)})

	var csvFile = ""


	procesarJsonArray(jsonArray, 0, 300)

	setUltimaCantidad(enviadas)

	return { success: true, enviadas: enviadas }
};


