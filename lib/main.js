#!/usr/bin/env node

//Entry Point 

var fs = require('fs');
var arg = require('optimist').argv;


// set up data dir
if (!fs.existsSync(process.env.HOME + '/.cfsh')){
    fs.mkdirSync(process.env.HOME + '/.cfsh');
}

//Command Switch
