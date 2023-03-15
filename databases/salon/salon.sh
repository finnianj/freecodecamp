#!/bin/bash
PSQL="psql -X --username=finncj --dbname=salon --tuples-only -c"

echo -e "\n~~~~~ Hair Salon ~~~~~\n"

MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  echo -e "\nWhich service would you like?"
  SERVICES=$($PSQL 'SELECT * FROM services ORDER BY service_id')
  echo "$SERVICES" | while read SERVICE_ID BAR SERVICE_NAME
  do
    if [[ $SERVICE_ID =~ ^[0-9]+$ ]]
    then
      echo -e "\n$SERVICE_ID) $SERVICE_NAME"
    fi
  done
  echo -e "\n4) Exit"

  read SERVICE_ID_SELECTED

  case $SERVICE_ID_SELECTED in
    1) CUT_MENU 1;;
    2) CUT_MENU 2;;
    3) CUT_MENU 3;;
    4) EXIT ;;
    *) MAIN_MENU "Please enter a valid option." ;;
  esac
}

CUT_MENU() {
  # get customer info
  echo -e "\nWhat's your phone number?"
  read CUSTOMER_PHONE
  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'")
  # if not found
  if [[ -z $CUSTOMER_NAME ]]
  then
    echo -e "\nI could not find a record for that phone number."
    echo -e "\nWe will add you to our database - what's your name?\n"
    read CUSTOMER_NAME
    ADD_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(name, phone) VALUES('$CUSTOMER_NAME', '$CUSTOMER_PHONE')")
    if [[ $ADD_CUSTOMER_RESULT == 'INSERT 0 1' ]]
    then
      echo -e "\nYou have been successfully added. Welcome, $(echo $CUSTOMER_NAME | sed -r 's/^ *| *$//g')."
    fi
  else
    echo -e "\nWelcome back, $(echo $CUSTOMER_NAME | sed -r 's/^ *| *$//g')"
  fi
    CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")
    SERVICE=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED")
    echo -e "\nWhat time would you like your$SERVICE?"
    read SERVICE_TIME
    CREATE_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")
    if [[ $CREATE_APPOINTMENT_RESULT == 'INSERT 0 1' ]]
    then
      echo -e "\nI have put you down for a$SERVICE at $SERVICE_TIME, $(echo $CUSTOMER_NAME | sed -r 's/^ *| *$//g')."
    else
    echo Please try again.
    fi
}

EXIT() {
  echo Goodbye!
}

MAIN_MENU
