var keygen = require('ssh-keygen');

var server = require('./server');
var client = require('./client');

var verbose = false;

module.exports.create_ssh_directory = function(arg, bucket, username){

	if(ard.v || arg.verbose){
		verbose = true;
	}

	create_ssh_key(username, bucket, function(pub_key, pri_key){
		put_ssh_key(bucket, username, pri_key);
		server.add_ssh_server(arg, pub_key);
		client.add_ssh_user(arg, bucket, pri_key);
	});
};

function create_ssh_key(username, bucket,callback){

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

function put_ssh_key(bucket, username, pri_key){

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
		Key: 'sman/',
		ACL: private,
		GrantRead: "uri=http://acs.amazonaws.com/groups/global/AllUsers"
	};
	s3.putObjectAcl(params, function(err, data) {
		if (err){
			console.log(err, err.stack);
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

	if(verbose){
		console.log('Secured data within s3');
	}
}
