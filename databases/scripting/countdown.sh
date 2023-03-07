#!/bin/bash
#Program that counts down to zero from a given argument
echo -e "\n~~ Countdown Timer ~~\n"

if [[ $1 -gt 0 ]]
then
  #example of for loop, commented out using multi line comment
  : ' for (( i = $1; i >= 0; i-- ))
  do
    echo $i
    sleep 1
  done
  '

  I=$1
  while [[ I -ge 0 ]]
  do
    echo $I
    #when using echo with a variable, you have to use $
    (( I-- ))
    sleep 1
  done
else
  echo Include a positive integer as the first argument.
fi
