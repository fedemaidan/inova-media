const fs = require('fs')

module.exports = async(nombre, razon, error) => {
	
	var csvRow = "\n"+nombre+","+razon+","+error
	fs.appendFile("cargas/errores.csv", csvRow, "utf8", (err) =>{
			console.log(nombre, "tuvo error - CSV cargado - ", razon, error);
		})
	
};