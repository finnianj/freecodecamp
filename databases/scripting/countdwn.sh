#!/bin/bash
#Program that counts down to zero from a given argument

echo $*
#prints all given arguments. arguments are given in terminal like so: ./countdown.sh arg1 arg2 arg3
echo $1
#prints first argument

if [[ $1 == arg1 ]]
then
  echo true
fi
#using conditional statement
