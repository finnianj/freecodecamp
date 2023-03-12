# You can create or overwrite a file using >

echo My name is Finn > file.txt

# If there is anything in the file, it would be overwritten.

echo I am a drummer >> file.txt

# The double arrow appends to the file, so the previous content is not overwritten.


# There are two types of output, stdout and stderr.
# If a command is succesfull, the output is stdout.
# If a command throws an error, the output is stderr.

# You can redirect the output using 1> for stdout and 2> for stderr.

# For example:

echo Hello there 1> file.txt
bad_command 2> file.txt

# This creates a new file and send the output there. Nothing is printed in the terminal.
