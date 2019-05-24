var request = require('request');
var aws = require('aws-sdk');

var s3 = new aws.S3({
  accessKeyId: 'AKIAWN4BQIMGNJ6CKDZG',
  secretAccessKey: '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',
  region: 'us-east-1',
})

module.exports = (url, nombre) => {
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
                Bucket: 'inova-media',
                ACL: 'public-read'
            }, function(error, data) { 
                if (error) {
                    console.log("error downloading image to s3");
                } else {
                    console.log("success uploading to s3 ",nombre);
                }
            }); 
        }   
    });
}
