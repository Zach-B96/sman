var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var server = require('./adjust_server');
var client = require('./adjust_local');
var add = require('./add');
var create_keys = require('./create_keys');

var verbose = false;

module.exports.create_ssh_directory = function(arg, bucket, username){

	if(ard.v || arg.verbose){
		verbose = true;
	}

	create_keys.create_ssh_key(function(pub_key, pri_key){
		add.place_key(arg, bucket, username, pri_key);
		adjust_directory_permissions(bucket);
		server.add_ssh_server(arg, pub_key);
		client.add_ssh_user(arg, bucket, pri_key);
	});
};

function adjust_directory_permissions(bucket){

	params = {
		Bucket: bucket,
		Key: 'sman/',
		ACL: private,
		GrantRead: "uri=http://acs.amazonaws.com/groups/global/AllUsers"
	};
	s3.putObjectAcl(params, function(err, data) {
		if (err){
			console.log(err, err.stack);
		}
	});

	if(verbose){
		console.log('Secured s3 directory');
	}
}
