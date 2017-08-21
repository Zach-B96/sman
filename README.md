# sman

## About

The point of this program is to make the management of SSH keys simple and easy. The SSH keys will all be stored in s3. For each s3 bucket, there will be one 'admin' (with the ability to transfer admin privledges to any other user). This admin will have the ability to commission or decommission SSH keys with a simple one line command. Key rotation can also be set on a schedule as a cron job and can also be forced instantly in the case of a security concern or breach. On the server side, the inital implementation will adjust the known users for all servers shown with an aws list stacks command. Later on, support should be added to include the option of having a file containing a list of server IP Addresses, which will then have their known user files adjusted. The whole point of this application is to make an important process that used to be tedious, nice and easy. I plan to strip away all unnecessary features and then get back to basics. Only once those are firmly cemented will any extraneous implementations be supported.

## Installation

Not really sure about this yet. Eventually I will likely want to have this available both as an npm insatllation as well as possibly through homebrew.

## Admin Commands

uninstall (remove ssh credentials from s3, wipe entire directory, should be confirmation that they mean to do this)

add (the user must first have access to the s3 bucket) (initially this will only support adding users. Later the -u option will support users and -s, servers. This command does as it would appear: it creates an ssh key for a user and adjusts the known hosts for all servers. The user can obtain the ssh key from their s3 bucket)

remove (initially this will only support adding users. Later the -u option will support users and -s, servers. This command removes the local SSH key from that user, adjusts the known hosts on all servers to not allow that ssh key, and deletes the ssh key from s3)

[LATER] transfer (transer admin privledges) (this will add a password file to the directory in s3 that can only be read by the current admin and the next admin, when the next admin enters that password correctly, the file is deleted)

rotate (rotate ssh keys)

schedule (scheudle key rotation) (-x option to remove schedule)

help

## User Commands

sman (running just this command will pull the ssh key already created for you by your admin to be your ssh key)

[LATER] transfer {password} (command to become an admin. By default the admin is the original creator of the directory. The password must first be created by the admin and will be stored in s3 and then when this command is run, that file will be deleted)
