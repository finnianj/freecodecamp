#!/bin/bash

cat courses.csv | while read MAJOR COURSE
do
  echo $MAJOR
done

# reads each line of the csv and saves it into two variables, major and course

# There's a default IFS variable in bash. IFS stands for "Internal Field Separator". View it with declare -p IFS
# This variable is used to determine word boundaries. It defaults to spaces, tabs, and new lines. This is why the MAJOR variable was set to only the first word on each line from the data. Between the while and read commands, set the IFS to a comma like this: IFS=","
# Now, it should use the comma in the data to separate words instead of spaces. Run the script again to see if it's working.

cat courses.csv | while IFS="," read MAJOR COURSE
do
  echo $MAJOR
done


# Here's what we wanna do:

cat courses.csv | while IFS="," read MAJOR COURSE
do
# get major_id
# if not found
# insert major
# get new major_id
# get course_id
# if not found
# insert course
# get new course_id
# insert into majors_courses
done
