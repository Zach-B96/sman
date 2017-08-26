var exec = require("child_process").exec;

var verbose = false;

module.exports.add_ssh_client = function(arg, bucket, pri_key){

	if(ard.v || arg.verbose){
		verbose = true;
	}
	add_key(bucket, pri_key);
};

function add_key(bucket, pri_key){

	exec('echo "' + pri_key + '" | sudo tee ~/.ssh/' + bucket + '.pem');
	exec('sudo chmod 700 ~/.ssh/' + bucket + '.pem');
	exec('ssh-add -K ~/.ssh/' + bucket + '.pem');

	if(verbose){
		console.log('Your new ssh key has been created and added to your keychain');
	}
}

/*

Would like to somehow remove their old ssh key

*/
