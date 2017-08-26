var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var verbose = false;

module.exports.place_key = function(arg, bucket, username, key){

	if(ard.v || arg.verbose){
		verbose = true;
	}

	place(bucket, username, key);
};

function place(bucket, username, pri_key){

	var params = {
		Bucket: bucket,
		Key: 'sman/' + username + '/private',
		ACL: private,
		Body: pri_key
	};
	s3.putObject(params, function(err, data) {
		if (err){
			console.log(err, err.stack);
		}
		else{
			if(verbose){
				console.log('Placed private key within s3');
			}
		}
	});

	params = {
		Bucket: bucket,
		Key: 'sman/' + username + '/public',
		ACL: private,
		Body: pub_key
	};
	s3.putObject(params, function(err, data) {
		if (err){
			console.log(err, err.stack);
		}
		else{
			if(verbose){
				console.log('Placed public key within s3');
			}
		}
	});

	params = {
		Bucket: bucket,
		Key: 'sman/' + username + '/',
		ACL: private,
	};
	s3.putObjectAcl(params, function(err, data) {
		if (err){
			console.log(err, err.stack);
		}
	});
}