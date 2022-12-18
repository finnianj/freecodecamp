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
