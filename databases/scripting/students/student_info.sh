#!/bin/bash
# Info about my computer science students from students database
echo -e '\n~~ My Computer Science Students ~~\n'

PSQL="psql -X --username=finncj --dbname=students --no-align --tuples-only -c"
echo -e 'First name, last name, and GPA of students with a 4.0 GPA:'

echo "$($PSQL "SELECT first_name, last_name, gpa FROM students WHERE gpa >= 4.0")"
