const fs = require('fs')

module.exports = async(nombre, estado) => {
	
	var csvRow = "\n"+nombre+","+estado
	fs.appendFile("cargas/estado.csv", csvRow, "utf8", (err) =>{ if (err) console.log(err)})

	
};