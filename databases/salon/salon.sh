#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=salon -c"

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

  read MAIN_MENU_SELECTION

  case $MAIN_MENU_SELECTION in
    1) CUT_MENU ;;
    2) DYE_MENU ;;
    3) PERM_MENU ;;
    4) EXIT ;;
    *) MAIN_MENU "Please enter a valid option." ;;
  esac
}

CUT_MENU() {
  echo Cut
}

DYE_MENU() {
  echo Dye
}

PERM_MENU() {
  echo Perm
}

EXIT() {
  echo Bye!
}

MAIN_MENU
