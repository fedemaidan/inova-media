const express = require('express');
const router = express.Router();
const importRowsInovaMedia = require('../resolvers/importRowsInovaMedia')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post('/agregar',multipartMiddleware, importCsv);
router.get('/ultimaCarga',ultimaCarga);
router.get('/todas',todas);

async function importCsv(req, res) {
	res.send(await  importRowsInovaMedia(req.files.file.path) )
}

function ultimaCarga(req, res) {
	res.download('ultima.csv', 'ultima.csv')
}

function todas(req, res) {
	res.download('todas.csv', 'todas.csv')
}

module.exports = router;