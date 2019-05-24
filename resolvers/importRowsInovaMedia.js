const csv= require('csvtojson')
const fs = require('fs')
const saveImageFromUrl = require('./saveImageFromUrl')

module.exports = async(filePath) => {
		
	var input = await fs.createReadStream(filePath, 'utf8')
	var jsonArray = await csv({delimiter: ','}).fromStream(input)
	var enviadas = 0

	var csvFileHead = "SKU, TITULO, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10\n" 
	var csvFile = ""

	for (var i = 0; i < jsonArray.length; i++) {
		var json = jsonArray[i]
		
		try {
			var codigo = json["SKU"]
			var titulo = json["TITULO"].replace(/\s/g,'').replace(/['"]+/g, ''); 


			if (!titulo)
				titulo = "titulo"

			var csvRow = codigo+","+json["TITULO"]

			for (var imagen = 1; imagen <= 10; imagen++) {
				var urlAntigua = json[imagen.toString()]

				if (urlAntigua) {
					var nombreImagen = codigo+"/"+titulo+"/"+imagen.toString()
					saveImageFromUrl(urlAntigua,nombreImagen)
					var urlNueva = "https://inova-media.s3.amazonaws.com/"+nombreImagen
					csvRow += ","+ urlNueva
				}
				else {
					csvRow += ","
				}
			}
		} catch (e) {
			console.log(e)
		} finally {
			csvFile += csvRow+"\n"
			enviadas++
		}
	}

	fs.writeFile("cargas/ultima.csv", csvFileHead+csvFile, (err) => {
	  if (err) console.log(err);
		console.log("Se escribio el CSV ultimo");

		fs.appendFile("cargas/todas.csv", csvFile, "utf8", (err) =>{
			console.log("Se escribio el CSV total");
		})
	});

	return { success: true, enviadas: enviadas }
};