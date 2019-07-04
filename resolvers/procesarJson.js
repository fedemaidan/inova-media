const saveImageFromUrl = require('./saveImageFromUrl')
const fs = require('fs')
const addErrorLine = require('./addErrorLine')

module.exports = (json, pos, jsonArray, ultimo) => {

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
					saveImageFromUrl(urlAntigua,nombreImagen,pos, jsonArray, ultimo)
					var urlNueva = "https://inova-media.s3.amazonaws.com/"+nombreImagen
					csvRow = ","+ urlNueva
				}
				else {
					csvRow += ","
				}
			}
		} catch (e) {
			addErrorLine(json["SKU"], "Falló obteniendo datos imagen", e)
		} finally {
			fs.appendFile("cargas/ultima.csv", csvRow, "utf8", (err) =>{})
	}
}