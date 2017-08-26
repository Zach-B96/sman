var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var client = require('./client');

var verbose = false;

module.exports.run_user = function(arg, bucket, username){

	if(ard.v || arg.verbose){
		verbose = true;
	}

	if(arg.transfer){
		//call
	}
	else{
		get_key(bucket, username, function(err, key){
			if(err){
				console.error('Error retrieving key from s3: ' + err);
			}
			else{
				client.add_ssh_client(arg, bucket, key);
			}
		});	
	}
	

};

function get_key(bucket, username, callback){

	var params = {
		Bucket: bucket,
		Key: 'sman/' + username + '/private',
	};
	s3.getObject(params, function(err, data) {
		if (err){
			console.log(err, err.stack);
			callback(err, null)
		}
		else{
			if(verbose){
				console.log('Your key has been retrieved from s3');
			}
			callback(true, data.Body);
		}
	});
}

/* 
	sman
	transfer
*/
