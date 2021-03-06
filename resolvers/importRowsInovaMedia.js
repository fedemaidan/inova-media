const csv = require('csvtojson')
const fs = require('fs')
var path = require('path')

const saveImageFromUrl = require('./saveImageFromUrl')
const addErrorLine = require('./addErrorLine')
const setUltimaCantidad = require('./setUltimaCantidad')


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
	
	var csvFileHead = "SKU, TITULO, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10\n" 
	var csvFile = ""
	var enviadas = 0;
	
	jsonArray.forEach( (json) =>  {
		
		try {
			var codigo = json["SKU"]
			var titulo = json["TITULO"].replace(/\s/g,'').replace(/['"]+/g, ''); 


			if (!titulo)
				titulo = "titulo"

			var csvRow = codigo+","+json["TITULO"]

			for (var imagen = 1; imagen <= 10; imagen++) {
				var urlAntigua = json[imagen.toString()]

				if (urlAntigua) {
					var nombreImagen = codigo+"/"+titulo+"/"+imagen.toString()+path.extname(urlAntigua)
					saveImageFromUrl(urlAntigua,nombreImagen)
					var urlNueva = "https://inova-media.s3.amazonaws.com/"+nombreImagen
					csvRow += ","+ urlNueva
				}
				else {
					csvRow += ","
				}
			}
		} catch (e) {
			addErrorLine(json["SKU"], "Falló obteniendo datos imagen", e)
		} finally {
			csvFile += csvRow+"\n"
		}
	})

	fs.writeFile("cargas/ultima.csv", csvFileHead+csvFile, (err) => {
	  if (err) console.log(err);
		console.log("Se escribio el CSV ultimo");

		fs.appendFile("cargas/todas.csv", csvFile, "utf8", (err) =>{
			console.log("Se escribio el CSV total");
		})
	});

	return { success: true }
};