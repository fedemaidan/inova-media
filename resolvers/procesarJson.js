const saveImageFromUrl = require('./saveImageFromUrl')
const fs = require('fs')
const addErrorLine = require('./addErrorLine')
var path = require('path')

module.exports = (json, pos, jsonArray, ultimo) => {

		try {
			var codigo = json["SKU"]
			var titulo = json["TITULO"].replace(/\s/g,'').replace(/['"]+/g, ''); 


			if (!titulo)
				titulo = "titulo"

			var csvRow = codigo+","+json["TITULO"]

			for (var imagen = 1; imagen <= 10; imagen++) {
				var urlAntigua = json[imagen.toString()]
				var siguiente = json[(imagen+1).toString()] ? true : false

				if (urlAntigua) {
					var nombreImagen = codigo+"/"+titulo+"/"+imagen.toString()+path.extname(urlAntigua)
					saveImageFromUrl(urlAntigua,nombreImagen,pos, jsonArray, ultimo, siguiente)
					var urlNueva = "https://inova-media.s3.amazonaws.com/"+nombreImagen
					csvRow = ","+ urlNueva
				}
				else {
					csvRow += ","
				}
			}
		} catch (e) {
			if (typeof json !== "undefined")
				addErrorLine(json["SKU"], "Fallo procesando json", e)
			else
				addErrorLine("json invalido", "Fallo procesando json", e)

		} finally {
			fs.appendFile("cargas/ultima.csv", csvRow, "utf8", (err) =>{})
	}
}