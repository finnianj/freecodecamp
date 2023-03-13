# You can print the word count using wc. Check out man wc for details

wc notes.sh

touch info.txt

echo '#!/bin/bash' > info.txt
echo '\n'Number of words in notes.sh: >> info.txt
cat notes.sh | wc -w >> info.txt

cat info.txt

# You can use grep to find matching patterns in a file. Check out man grep fo options.
# One cool one is --color, which highlights matching patterns.
# Another is -n, which prints the line number
# Another is -o, which prints every match on a new line.

grep --color -n 'Finn' notes.sh

echo '\n'Number of times Finn appears in info.sh: >> info.txt

grep -o 'Finn' notes.sh | wc -l >> info.txt


# sed can replace text like this: sed 's/<pattern_to_replace>/<text_to_replace_it_with>/' <filename>.
# By default, it won't replace the text in the file. It will output it to stdout.

sed 's/n/m/' file.txt
