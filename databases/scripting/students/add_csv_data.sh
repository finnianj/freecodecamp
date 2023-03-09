#!/bin/bash

cat courses.csv | while read MAJOR COURSE
do
  echo $MAJOR
done

# reads each line of the csv and saves it into two variables, major and course
