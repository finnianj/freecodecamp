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

# You can add regex flags after the last / in the sed argument.
# A g, for global, would replace all instances of a matched pattern, or an i to ignore the case of the pattern.

sed 's/m/n/gi' file.txt

# --------------------------

# Extracting info from a text document.

echo '\n'~~ Halo 2 Document Info ~~ > halo_2_info.txt
echo '\n'~~ Number of lines:~~ >> halo_2_info.txt
wc -l halo_2.txt >> halo_2_info.txt

echo '\n'Number of times the word Covenant appears: >> halo_2_info.txt
grep -c 'Covenant' halo_2.txt >> halo_2_info.txt

echo '\n'~~ Lines that the word Covenant appears on:~~ >> halo_2_info.txt
grep -n 'Covenant' halo_2.txt | sed -E 's/([0-9]+).*/\1/' >> halo_2_info.txt
