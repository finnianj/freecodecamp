const fiveOrMore = new Promise ((resolve, reject) => {

  let answer = Math.random()*10;

  if (answer > 5) {
    resolve("Answer is greater than five");
  } else {
    reject("Answer is five or lower");
  }

})

fiveOrMore.then(result => {
  console.log(result);
})
fiveOrMore.catch(error => {
  console.log(error);
})

fiveOrMore;

// the .then and .catch methods define what happens in the result of
// a successful (fulfilled) promise, or a failed (rejected) promise.
// result and error refer to the arguments given to resolve and reject
// respectively.
