var keygen = require('ssh-keygen');

var server = require('./server');
var client = require('./client');
var add = require('./add');

var verbose = false;

module.exports.create_ssh_directory = function(arg, bucket, username){

	if(ard.v || arg.verbose){
		verbose = true;
	}

	create_ssh_key(function(pub_key, pri_key){
		add.place_key(arg, bucket, username, pri_key);
		adjust_directory_permissions(bucket);
		server.add_ssh_server(arg, pub_key);
		client.add_ssh_user(arg, bucket, pri_key);
	});
};

function create_ssh_key(callback){

	keygen({}, function(err, data){
		if(err){
			console.log('Something went wrong with creating ssh key: ' + err);
		}
		else{
			if(verbose){
				console.log('Created SSH key');
			}
			callback(data.pubKey, data.key);
		}
	});
}

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
