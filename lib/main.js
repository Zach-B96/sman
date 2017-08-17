#!/usr/bin/env node

//Entry Point 

var fs = require('fs');
var arg = require('optimist').argv;
var AWS = require('aws-sdk');

var s3 = new AWS.S3();

// set up data dir
if (!fs.existsSync(process.env.HOME + '/.sman')){
    fs.mkdirSync(process.env.HOME + '/.sman');
}

//Command Switch
