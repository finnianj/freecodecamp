#!/bin/bash

# cat courses.csv | while read MAJOR COURSE
# do
#   echo $MAJOR
# done

# reads each line of the csv and saves it into two variables, major and course

# There's a default IFS variable in bash. IFS stands for "Internal Field Separator". View it with declare -p IFS
# This variable is used to determine word boundaries. It defaults to spaces, tabs, and new lines. This is why the MAJOR variable was set to only the first word on each line from the data. Between the while and read commands, set the IFS to a comma like this: IFS=","
# Now, it should use the comma in the data to separate words instead of spaces. Run the script again to see if it's working.

# cat courses.csv | while IFS="," read MAJOR COURSE
# do
#   echo $MAJOR
# done


# Here's what we wanna do:

# cat courses.csv | while IFS="," read MAJOR COURSE
# do
# get major_id
# if not found
# insert major
# get new major_id
# get course_id
# if not found
# insert course
# get new course_id
# insert into majors_courses
# done

# PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

# This variable will allow us to make queries:

echo $($PSQL "TRUNCATE students, majors, courses, majors_courses")

# deletes all rows in the above tables.

cat courses.csv | while IFS="," read MAJOR COURSE
do
  if [[ $MAJOR != major ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")
    # if not found

    if [[ -z $MAJOR_ID ]]
    then
      # insert major
      INSERT_MAJOR_RESULT=$($PSQL "INSERT INTO majors(major) VALUES('$MAJOR')")

      if [[ $INSERT_MAJOR_RESULT == 'INSERT 0 1' ]]
      then
        echo Inserted into majors, $MAJOR
      fi

      # get new major_id
      MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")
    fi

  fi

  # get course_id
  if [[ $COURSE != 'course' ]]
    then
    COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")

    # if not found
    if [[ -z $COURSE_ID ]]
    then
      # insert course
      INSERT_COURSE_RESULT=$($PSQL "INSERT INTO courses(course) VALUES('$COURSE')")

      if [[ $INSERT_COURSE_RESULT == 'INSERT 0 1' ]]
      then
        echo Inserted into courses, $COURSE
      fi

      # get new course_id
      COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")
    fi

    # insert into majors_courses
    INSERT_MAJORS_COURSES_RESULT=$($PSQL "INSERT INTO majors_courses(major_id, course_id) VALUES($MAJOR_ID, $COURSE_ID)")
    if [[ $INSERT_MAJORS_COURSES_RESULT == 'INSERT 0 1' ]]
    then
      echo Inserted into majors_courses, $MAJOR : $COURSE
    fi

  fi


done

cat students.csv | while IFS="," read FIRST LAST MAJOR GPA
do
  if [[ $FIRST != 'first_name' ]]
  then
    #get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    #if id is empty
    if [[ -z $MAJOR_ID ]]
    then
      #set to null
      MAJOR_ID=null
    fi
    echo $MAJOR_ID 
    #insert student

  fi
done
