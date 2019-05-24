const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();
var aws = require('aws-sdk');
var http = require('http'),                                                
    Stream = require('stream').Transform,                                  
    fs = require('fs');   
var request = require('request');

var s3 = new aws.S3({
  accessKeyId: 'AKIAWN4BQIMGNJ6CKDZG',
  secretAccessKey: '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',
  region: 'us-east-1',
})


router.post('/subir',importCsv);
router.get('/listar',listar);

function importCsv(res, req) {

}

function listar(res, req) {

	var params = {
	  Bucket: 'inova-media', /* required */
	  //ContinuationToken: 'STRING_VALUE',
	  Delimiter: '/',
	  //EncodingType: url,
	  MaxKeys: '50',
	};

	s3.listObjectsV2(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);           // successful response
	});	

}

function saveImageFromUrl(url, nombre) {
	  var options = {
        uri: url,
        encoding: null
    };
    
    request(options, function(error, response, body) {
        if (error || response.statusCode !== 200) { 
            console.log("failed to get image");
            console.log(error);
        } else {
            s3.putObject({
                Body: body,
                Key: nombre,
                Bucket: 'inova-media'
            }, function(error, data) { 
                if (error) {
                    console.log("error downloading image to s3");
                } else {
                    console.log("success uploading to s3");
                }
            }); 
        }   
    });
}


module.exports = router;