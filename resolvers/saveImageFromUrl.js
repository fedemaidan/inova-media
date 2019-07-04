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

module.exports = (url, nombre, pos, jsonArray, ultimo) => {
	  var options = {
        uri: url,
        encoding: null
    };

    request(options, function(error, response, body) {
        if (error || response.statusCode !== 200) { 
            addErrorLine(nombre, "Falló obteniendo imagen en pos "+pos, error)
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
                if (ultimo)
                    procesarJsonArray(jsonArray, pos, pos+50) 
                if (error) {
                    addErrorLine(nombre, "Falló guardando imagen en pos "+pos, error)
                } else {
                    //console.log("success uploading to s3 ",nombre);
                    addFinalLine(nombre, "CORRECTO" )
                }
            }); 
        }   
    });
}



function procesarJsonArray(jsonArray, desde, hasta) {
    for (var i = desde; i < hasta; i++) {
        var json = jsonArray[i]
        procesarJson(json,i,jsonArray, i+1 == hasta)
    }    
}


function procesarJson(json, pos, jsonArray, ultimo) {

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
            fs.appendFile("cargas/ultima.csv", csvRow, "utf8", (err) =>{ 
                  if (err) console.log(err);
                        
                fs.appendFile("cargas/todas.csv", csvRow, "utf8", (err) =>{
                    console.log("Se escribio el CSV total");
                })
        })
    }
}