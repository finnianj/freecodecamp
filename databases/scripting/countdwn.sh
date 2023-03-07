#!/bin/bash
#Program that counts down to zero from a given argument

echo $*
#prints all given arguments. arguments are given in terminal like so: ./countdown.sh arg1 arg2 arg3
echo $1
#prints first argument

if [[ $1 == arg1 ]]
then
  echo true
else
  echo false
fi
#using conditional statement
#You can compare integers inside the brackets ([[ ... ]]) of your if with -eq (equal), -ne (not equal), -lt (less than), -le (less than or equal), -gt (greater than), -ge (greater than or equal).
#Each command has an exit status that can be accessed with $?. View the exit status of the last command with echo $?
#0 is true, 1 is false

[[ 4 -ge 5 ]]; echo $?
#you can run separate commands on a single line with ;. $? prints the exit status of the last command.
