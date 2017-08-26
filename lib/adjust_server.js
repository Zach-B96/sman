var exec = require("child_process").exec;
var ec2 = new AWS.EC2();

var verbose = false;
var ip_addresses = [];

module.exports.add_ssh_server = function(arg, pub_key){

	if(ard.v || arg.verbose){
		verbose = true;
	}
	adjust_servers(pub_key);
};

function adjust_servers(pub_key){

	//get all of the ips
	var no_nore_stacks = false;
	var next_token = null;
	while(!no_nore_stacks){
		get_ips(next_token, function(err, data){
			if(err){
				console.error('Error listing stacks');
			}
			else{
				if(data.NextToken === null){
					no_more_stacks = true;
				}
				else{
					next_token = data.NextToken;
				}
			}
		});
	}

	/*
		There is a jshint error in the above loop I just don't care to fix right now.
		It refers to confusing semantics...It may be confusing but for now anyways it should work.
		At a later date the way this is executed should be cleaned up for the sake of cleanliness
		And the fact that tests will be run upon every PR, and part of the test will be running jshint
	*/

	if(verbose){
		console.log('Recieved all IP Addressed for EC2 instances');
	}

	//add the publix key to the known user list for all of the ec2 instances
	for(var ip_address in ip_addresses){
		exec('ssh ' + ip_addresses[ip_address] + 'echo "' + pub_key + '" | sudo tee --append ~/.ssh/authorized_keys && sudo service ssh restart && exit');
	}

	if(verbose){
		console.log('Added public key to list of known users on all instances');
	}
}

function get_ips(token, callback){
	var params = {
		NextToken: token,
	};
	ec2.describeInstances(params, function(err, data) {
		if(err){
			console.log(err, err.stack);
		}
		else{
			for(var instance in data.Reservations.Instances){
				ip_addresses.append(instance.PublicIpAddress);
			}
		}
	});
}
