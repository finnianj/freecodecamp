#!/bin/bash
# Program to tell a persons fortune

#-------NOTES--------------

# defining an array: ARR=("a" "b" "c")
# printing item 2: echo ${ARR[1]}
# printing entire array: echo ${ARR[*]}

# testing for pattern matching with =~. Also accepts REGEXP

#--------------------------

echo -e "\n~~ Fortune Teller ~~\n"

RESPONSES=("Yes" "No" "Maybe" "Outlook good" "Don't count on it" "Ask again later")

N=$(( RANDOM % 6 ))

GET_FORTUNE() {
  echo Ask a yes or no question:
  read QUESTION
}

until [[ $QUESTION =~ \?$ ]]
do
  GET_FORTUNE
done

echo ${RESPONSES[$N]}
