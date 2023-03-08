#!/bin/bash
# Program to tell a persons fortune

#-------NOTES--------------

# defining an array: ARR=("a" "b" "c")
# printing item 2: echo ${ARR[1]}
# printing entire array: echo ${ARR[*]}

# testing for pattern matching with =~. Also accepts REGEXP

# you can pass arguments to functions: FUNCTION argument. No parentheses needed. Inside the function you can access arguments with $1, $2 $3 etc.

#--------------------------

echo -e "\n~~ Fortune Teller ~~\n"

RESPONSES=("Yes" "No" "Maybe" "Outlook good" "Don't count on it" "Ask again later")

N=$(( RANDOM % 6 ))


GET_FORTUNE() {
  if [[ ! $1 ]]
  then
    echo Ask a yes or no question:
  else
    echo Try again. Make sure it ends with a question mark:
  fi

  read QUESTION
}

GET_FORTUNE

until [[ $QUESTION =~ \?$ ]]
do
  GET_FORTUNE again
done

echo -e "\n${RESPONSES[$N]}"
