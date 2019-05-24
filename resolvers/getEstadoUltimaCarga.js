const fs = require('fs')
const csv= require('csvtojson')

module.exports = async () => {
	
	var ultimaCantidad = fs.readFileSync('cargas/ultimaCantidad', 'utf8');
	var cantidadCorrectas = await  getCantidadFilas("cargas/estado.csv")
	var cantidadErrores = await getCantidadFilas("cargas/errores.csv")
	var terminado = ultimaCantidad == (cantidadCorrectas + cantidadErrores) ? true : false

	return { 
		terminado: terminado,
		correctas: cantidadCorrectas,
		errores: cantidadErrores,
		total: ultimaCantidad
	}
};


async function getCantidadFilas(filePath) {
	var input = await fs.createReadStream(filePath, 'utf8')
	var jsonArray = await csv({delimiter: ','}).fromStream(input)
	return jsonArray.length
}