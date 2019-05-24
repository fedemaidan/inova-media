const express = require('express');
const router = express.Router();
const importRowsInovaMedia = require('../resolvers/importRowsInovaMedia')
const getEstadoUltimaCarga = require('../resolvers/getEstadoUltimaCarga')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const fs = require('fs')

router.post('/agregar',multipartMiddleware, importCsv);
router.get('/ultimaCarga',ultimaCarga);
router.get('/erroresUltima',erroresUltima);
router.get('/todas',todas);
router.get('/estadoUltima',estadoUltima);

async function importCsv(req, res) {
	res.send(await  importRowsInovaMedia(req.files.file.path) )
}

function ultimaCarga(req, res) {
	res.download('cargas/ultima.csv', 'ultima.csv')
}

function todas(req, res) {
	res.download('cargas/todas.csv', 'todas.csv')
}

function erroresUltima(req, res) {
	res.download('cargas/errores.csv', 'errores.csv')
}


async function estadoUltima(req, res) {
	res.send( await getEstadoUltimaCarga())
}

module.exports = router;