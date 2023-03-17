#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

echo -e "\n~~ Number Guessing Game ~~\n"
echo -e "\nEnter your username:"
read INPUT
USERNAME="$(echo -e $INPUT | sed -r 's/^ *| *$//g')"

USER=$($PSQL "SELECT * FROM users WHERE name LIKE '$USERNAME'")



NUMBER=$(( RANDOM % 1001 ))
echo -e "the number is $NUMBER"
echo -e "\nGuess the secret number between 1 and 1000:"
GUESSES=0

until [[ $NUMBER -eq $GUESS ]]
do
GUESSES=$(($GUESSES+1))
read GUESS
if [[ $GUESS  =~ ^[0-9]+$ ]]
then

  if [[ $NUMBER -lt $GUESS ]]
  then
    echo -e "\nIt's lower than that, guess again:"
  elif [[ $NUMBER -gt $GUESS ]]
  then
    echo -e "\nIt's higher than that, guess again:"
  else
    echo -e "\nYou guessed it in $GUESSES tries. The secret number was $NUMBER. Nice job!"
  fi

else
  echo -e "\nThat is not an integer, guess again:"
fi
done

INSERT_GAME_RESULT=$($PSQL "INSERT INTO games(user_id, guesses) VALUES($USER_ID, $GUESSES)");
