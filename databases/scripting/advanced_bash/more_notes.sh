# You can print the word count using wc. Check out man wc for details

wc notes.sh

touch info.txt

echo '#!/bin/bash' > info.txt
echo '\n'Number of words: >> info.txt
cat notes.sh | wc -w >> info.txt

cat info.txt

# You can use grep to find matching patterns in a file. Check out man grep fo options.
# One cool one is --color, which highlights matching patterns.

grep --color 'Finn' notes.sh
