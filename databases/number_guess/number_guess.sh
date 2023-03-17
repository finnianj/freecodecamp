#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

echo -e "\n~~ Number Guessing Game ~~\n"
echo -e "\nEnter your username:"
read INPUT
USERNAME="$(echo -e $INPUT | sed -r 's/^ *| *$//g')"

USER=$($PSQL "SELECT * FROM users WHERE name LIKE '$USERNAME'")

if [[ -z $USER ]]
then
  INSERT_USER_RESULT=$($PSQL "INSERT INTO users(name) VALUES('$USERNAME')")
  echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
  USER_ID=$($PSQL "SELECT user_id FROM users WHERE name LIKE '$USERNAME'")
  NUMBER_OF_GAMES=0
else
  USER_ID=$($PSQL "SELECT user_id FROM users WHERE name LIKE '$USERNAME'")
  NUMBER_OF_GAMES=$($PSQL "SELECT COUNT(*) FROM games WHERE user_id=$USER_ID")
  BEST_GAME_GUESSES=$($PSQL "SELECT guesses FROM games WHERE user_id=$USER_ID ORDER BY guesses LIMIT 1")
  echo your best game: $BEST_GAME_GUESSES
  echo -e "\nWelcome back, $USERNAME! You have played $NUMBER_OF_GAMES games, and your best game took $BEST_GAME_GUESSES guesses."
fi

NUMBER=$(( RANDOM % 1001 ))
echo -e "the number is $NUMBER"
echo -e "\nGuess the secret number between 1 and 1000:"
GUESSES=0



INSERT_GAME_RESULT=$($PSQL "INSERT INTO games(user_id, guesses) VALUES($USER_ID, $GUESSES)");
