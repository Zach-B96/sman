
module.exports.create_ssh_directory = function(arg, username){

create_directory();
create_ssh_key();
add_ssh_server(); //use promise
add_ssh_user(); //use promise
inform();

};

/* 
1. create directory (make sure only admin has write access)
2. create new ssh key for user
3. add that ssh key to the known user list for each stack given with list stacks
4. add the ssh private key to a key file in the user's ssh key folder (and remove their old key)
5. tell the user what has been done and that their old key has been removed
6. encourage user to set a schedule for rotation 
*/

function create_directory(){

}

function create_ssh_key(){

}

function add_ssh_server(){

}

function add_ssh_user(){

}

function inform(){

}