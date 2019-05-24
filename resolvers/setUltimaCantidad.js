const fs = require('fs')

module.exports = async(ultimaCantidad) => {
	fs.writeFile("cargas/ultimaCantidad", ultimaCantidad.toString(), (err) => {
	  if (err) console.log(err);
		console.log("Set ultima cantidad " + ultimaCantidad);
	})
}