var keygen = require('ssh-keygen');

module.exports.create_ssh_key = function(callback){

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