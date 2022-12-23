function whatIsInAName(collection, source) {
  let arr = [];
  let keys = Object.keys(source);

  for (let i = 0; i < collection.length; i++) {
    let ans = keys.every(function(key) {
      if (collection[i].hasOwnProperty(key) && collection[i][key] == source[key]) {
        return true;
      }
    })
    if (ans == true) {
      arr.push(collection[i]);
    }
  }
  return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });


// Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching name and value pairs (second argument). Each name and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.
