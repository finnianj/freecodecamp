#!/bin/bash
PSQL="psql -X --username=freecodecamp --dbname=periodic_table --tuples-only -c"

if [[ -z $1 ]]
then
  echo Please provide an element as an argument.
else

  USER_INPUT=$1
  if [[ $USER_INPUT =~ ^[0-9]+$ ]]
  then
    ELEMENT=$($PSQL "SELECT * FROM elements WHERE
    atomic_number=$USER_INPUT")
  else
    ELEMENT=$($PSQL "SELECT * FROM elements WHERE
    symbol LIKE '$USER_INPUT' OR
    name LIKE '$USER_INPUT'")
  fi
  echo $ELEMENT
fi
