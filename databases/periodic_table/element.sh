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

  if [[ -z $ELEMENT ]]
  then
    echo I could not find that element in the database.
  else
    ATOMIC_NUMBER=$( echo $ELEMENT | sed -e 's/\s.*$//' )
    PROPERTIES=$($PSQL "SELECT * FROM properties WHERE atomic_number=$ATOMIC_NUMBER")
    echo "$PROPERTIES $ELEMENT" | while read NUM BAR MASS BAR MELT BAR BOIL BAR TYPE_ID BLANK BAR SYMBOL BAR NAME
    do
      if [[ $TYPE_ID == 1 ]]
      then
        TYPE='metal'
      elif [[ $TYPE_ID == 2 ]]
      then
        TYPE='nonmetal'
      elif [[ $TYPE_ID == 3 ]]
      then
        TYPE='metalloid'
      fi
      echo -e "The element with atomic number $NUM is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELT celsius and a boiling point of $BOIL celsius."
    done
  fi
fi
