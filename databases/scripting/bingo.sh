#!/bin/bash
# Bingo Number Generator

echo -e "\n~~ Bingo Number Generator ~~\n"

#printenv will print all environment variables to the terminal. Every shell comes with preloaded environment variables.
#declare -p will print all the variables in the shell. One of these is RANDOM, which gives a randome number

NUMBER=$RANDOM%75

#modulo defines the range [0-75]

echo $NUMBER

#because BASH sees everything as a string, here NUMBER will be NUMBER%75.
