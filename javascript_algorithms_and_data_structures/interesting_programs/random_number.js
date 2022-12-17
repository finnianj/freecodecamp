function randomRange(myMin, myMax) {
  // Only change code below this line

  return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
  // Only change code above this line
}


// (myMax - myMin + 1) specifies the range. The random number is scaled by multiplying it by the range.
//  the + myMin then guarantees that the result is not less than the min value.
