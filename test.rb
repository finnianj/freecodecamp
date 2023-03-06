deluded = true

while deluded
  puts "What do you think? Type 'I am crazy' or 'I am not crazy'"
  my_thoughts = gets.chomp
  puts "..."
  sleep 1
  if my_thoughts == "I am crazy"
    puts "Fool! You are deluded"
    sleep 1
    puts "Try again"
    sleep 1
  elsif my_thoughts == "I am not crazy"
    puts "Congratulations..."
    sleep 1
    deluded = false
  else
    puts "Try again"
    sleep 1
  end

end
puts "You are not deluded! Now get back to whatever it is you're too anxious to face (:"
