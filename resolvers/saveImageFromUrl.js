var request = require('request');
var aws = require('aws-sdk');
const addErrorLine = require('./addErrorLine')
const addFinalLine = require('./addFinalLine')
var path = require('path')

var s3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'us-east-1',
})

module.exports = (url, nombre) => {
	  var options = {
        uri: url,
        encoding: null
    };

    request(options, function(error, response, body) {
        if (error || response.statusCode !== 200) { 
            addErrorLine(nombre, "Falló obteniendo imagen", error)
        } else {
            var type = path.extname(url).replace(".", "")

           // if (type == "jpg")
            //    type = "jpeg"
            s3.putObject({
                Body: body,
                Key: nombre,
                Bucket: 'inova-media',
                ACL: 'public-read',
                ContentType: 'image/'+type
            }, function(error, data) { 
                if (error) {
                    addErrorLine(nombre, "Falló guardando imagen", error)
                } else {
                    console.log("success uploading to s3 ",nombre);
                    addFinalLine(nombre, "CORRECTO" )
                }
            }); 
        }   
    });
}