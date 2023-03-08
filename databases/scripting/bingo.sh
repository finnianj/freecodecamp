#!/bin/bash
# ---------------- NOTES -------------------------------------------------------

#printenv will print all environment variables to the terminal. Every shell comes with preloaded environment variables.
#declare -p will print all the variables in the shell. One of these is RANDOM, which gives a randome number

# NUMBER=$RANDOM%75

#modulo defines the range [0-75]

# echo $NUMBER

#because BASH sees everything as a string, here NUMBER will be NUMBER%75.
# doubles parentheses with a $ will provide the result of a calculation as output. If you don't put $ before (()), then the calculation will be performed but not have output. It is good for changing variable values.
# So, if you want to do something with the result of a calculation, use $(()).

# declare -p NUMBER
#you can view variables that you have stored with declare -p variable_name.

--------------------------------------------------------------------------------

echo -e "\n~~ Bingo Number Generator ~~\n"

NUMBER=$(( RANDOM % 75 + 1 ))

TEXT="The next number is, "

if (( $NUMBER <= 15 ))
then
  echo "$TEXT B:$NUMBER"
elif [[ $NUMBER -le 30 ]]
then
  echo "$TEXT I:$NUMBER"
fi
