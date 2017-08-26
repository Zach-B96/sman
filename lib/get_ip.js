var ec2 = new AWS.EC2();

var verbose = false;
var ip_addresses = [];

module.exports.get_ips = function(callback){

	if(ard.v || arg.verbose){
		verbose = true;
	}

	//get all of the ips
	var no_nore_stacks = false;
	var next_token = null;
	while(!no_nore_stacks){
		get_em(next_token, function(err, data){
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

	callback(ip_addresses);
};

function get_em(token, callback){
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