#!/usr/bin/env node

//Entry Point 

var fs = require('fs');
var arg = require('optimist').argv;

//if the AWS profile is expicilty defined, use that rather than the envirnment default
if(arg.p !== undefined){
	process.env.AWS_PROFILE = arg.p;
}

var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var iam = new AWS.IAM();

var create = require('./create_dir');
var administrator = require('./admin');
var user = require('./user');

var bucket;
var admin;
var exists;
var me;

// set up data directory
if(!fs.existsSync(process.env.HOME + '/.sman')){
	fs.mkdirSync(process.env.HOME + '/.sman');
}

if(arg.h || arg.help){
	//call some help command
	process.exit();
}

iam.getUser({}, function(err, data) {
	if (err){
		console.log('Error getting aws username');
		console.log(err, err.stack);
	}
	else{
		me = data.User.UserName;
	}
});

if(arg.b !== undefined || arg.bucket !== undefined){
	bucket = arg.b;
}
else{
	s3.listBuckets({}, function(err, data){
		if(err){
			console.log('Error listing buckets: ');
			console.log(err, err.stack); 
		}
		else{
			if(data.Buckets.length === 1){
				bucket = data.Buckets.Name;
			}
			else{
				console.error('You must define the bucket in which you wish to use sman');
			}
		}
	});
}

s3.listObjects({Bucket: bucket}, function(err, data) {
	if(err){
		console.log('Error listing Objects: ');
		console.log(err, err.stack);
	}
	else{
		for(var file in data.Contents){
			if(file.Key === 'sman/'){
				exists = true;
				if(file.Owner.DisplayName === me){
					admin = true;
				}
				else{
					admin = false;
				}
			}
			else{
				exists = false;
				admin = true;
			}
		}
	}
});

if(exists === false){
	arg.u = me;
	create.create_ssh_directory(arg, bucket, me);
}

if(admin){
	administrator.run_admin(arg);
}
else{
	user.run_user(arg, bucket, me);
}
