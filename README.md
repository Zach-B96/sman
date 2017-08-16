# sman

## About

The point of this program is to make the management of SSH keys simple and easy. The SSH keys will all be stored in s3. For each s3 bucket, there will be one 'admin' (with the ability to transfer admin privledges to any other user). This admin will have the ability to commission or decommission SSH keys with a simple one line command. Key rotation can also be set on a schedule as a cron job and can also be forced instantly in the case of a security concern or breach. On the server side, the inital implementation will adjust the known users for all servers shown with an aws list stacks command. Later on, support should be added to include the option of having a file containing a list of server IP Addresses, which will then have their known user files adjusted. The whole point of this application is to make an important process that used to be tedious, nice and easy. I plan to strip away all unnecessary features and then get back to basics. Only once those are firmly cemented will any extraneous implementations be supported.

## Installation

Not really sure about this yet. Eventually I will likely want to have this available both as an npm insatllation as well as possibly through homebrew.

## Commands

install (will check for env variables, if empty it will require either a path to a credentials file or a manual entry)

uninstall (remove aws credentials)

add (the user must first have access to the s3 bucket) (initially this will only support adding users. Later the -u option will support users and -s, servers. This command does as it would appear: it creates an ssh key for a user and adjusts the known hosts for all servers. The user can obtain the ssh key from their s3 bucket)

remove (initially this will only support adding users. Later the -u option will support users and -s, servers. This command removes the local SSH key from that user, adjusts the known hosts on all servers to not allow that ssh key, and deletes the ssh key from s3)

[LATER] transfer (transer admin privledges) 

rotate (rotate ssh keys)

schedule (scheudle key rotation) (-x option to remove schedule)

help