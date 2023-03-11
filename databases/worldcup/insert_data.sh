#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

echo $($PSQL "TRUNCATE games, teams")

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do

  if [[ $WINNER != winner ]]
  then

    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")

    if [[ -z $WINNER_ID ]]
    then
      ADD_TEAM=$($PSQL "INSERT INTO teams(name) VALUES('$WINNER')")

      if [[ $ADD_TEAM == 'INSERT 0 1' ]]
      then
        echo Inserted into teams, $WINNER
      fi

    fi

  fi


  if [[ $OPPONENT != opponent ]]
  then

    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")

    if [[ -z $OPPONENT_ID ]]
    then
      ADD_TEAM=$($PSQL "INSERT INTO teams(name) VALUES('$OPPONENT')")

      if [[ $ADD_TEAM == 'INSERT 0 1' ]]
      then
        echo Inserted into teams, $OPPONENT
      fi

    fi

  fi


done

#-------game data-------

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do

  if [[ $YEAR != year ]]
  then
    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")
    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")
    ADD_GAME=$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS)")

    if [[ $ADD_GAME == 'INSERT 0 1' ]]
    then
      echo Added $YEAR $ROUND between $WINNER and $OPPONENT
    fi

  fi

done
