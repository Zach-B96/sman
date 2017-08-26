var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var verbose = false;
var username;

module.exports.remove_key = function(arg, bucket){

	if(ard.v || arg.verbose){
		verbose = true;
	}

	username = arg.u;

	remove(bucket, username);
};

function remove(bucket, username){

	var params = {
		Bucket: bucket,
		Key: 'sman/' + username + '/private'
	};
	s3.deleteObject(params, function(err, data) {
		if (err){
			console.log(err, err.stack);
		}
		else{
			if(verbose){
				console.log('Removed private key from s3');
			}
		}
	});

	params = {
		Bucket: bucket,
		Key: 'sman/' + username + '/public'
	};
	s3.deleteObject(params, function(err, data) {
		if (err){
			console.log(err, err.stack);
		}
		else{
			if(verbose){
				console.log('Removed public key from s3');
			}
		}
	});

	params = {
		Bucket: bucket,
		Key: 'sman/' + username
	};
	s3.deleteObject(params, function(err, data) {
		if (err){
			console.log(err, err.stack);
		}
		else{
			if(verbose){
				console.log('Removed user directory from s3');
			}
		}
	});
}
