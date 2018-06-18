var exec = require("child_process").exec;
var ec2 = new AWS.EC2();

var get_ip = require('./get_ip');

var verbose = false;

module.exports.remove_ssh_server = function(arg, pub_key){

	if(ard.v || arg.verbose){
		verbose = true;
	}

	get_ip.get_ips(function(ip_addresses){
		adjust_servers(ip_addresses, pub_key);
	})
};

function adjust_servers(ip_addresses, pub_key){

	//add the publix key to the known user list for all of the ec2 instances
	for(var ip_address in ip_addresses){
		exec('ssh ' + ip_addresses[ip_address] + 'sudo sed "' + pub_key + '" ~/.ssh/authorized_keys && sudo service ssh restart && exit');
	}

	//some sed bullshit

	if(verbose){
		console.log('Added public key to list of known users on all instances');
	}
}
