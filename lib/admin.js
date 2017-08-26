var verbose = false;

module.exports.run_admin = function(arg){

	if(ard.v || arg.verbose){
		verbose = true;
	}

	switch(arg){
		case(arg.schedule):
			//call [LATER]
			break;
		
		case(arg.rotate):
			//call 
			break;
		
		case(arg.add):
			//call
			break;
		
		case(arg.remove):
			//call 
			break;
		
		case(arg.uninstall):
			//Remove everything from the directory, should be confirmation [LATER]
			break;
		
		case(arg.transfer):
			//call [LATER]
			break;
		
		default:
			console.log('I do not recognize that command')
			break;
	}
	

};

/* 
	Schedule
	Rotate
	Add
	Remove
	Uninstall
	Transfer
*/
