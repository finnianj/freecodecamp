#!/bin/bash
# Program to tell a persons fortune

#-------NOTES--------------

# defining an array: ARR=("a" "b" "c")
# printing item 2: echo ${ARR[1]}
# printing entire array: echo ${ARR[*]}

#--------------------------

echo -e "\n~~ Fortune Teller ~~\n"

RESPONSES=("Yes" "No" "Maybe" "Outlook good" "Don't count on it" "Ask again later")

echo ${RESPONSES[5]}
