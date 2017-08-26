var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var verbose = false;
var username;

module.exports.place_key = function(arg, bucket, key){

	if(ard.v || arg.verbose){
		verbose = true;
	}

	username = arg.u;

	place(bucket, username, key);
};

//ALL I NEED TO DO IS GRANT READ TO USERNAME
//should also check if the file already exists so that i don't duplicate

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