Functional programming is a style of programming where solutions are simple, isolated functions, without any side effects outside of the function scope: INPUT -> PROCESS -> OUTPUT

Functional programming is about:

Isolated functions - there is no dependence on the state of the program, which includes global variables that are subject to change

Pure functions - the same input always gives the same output

Functions with limited side effects - any changes, or mutations, to the state of the program outside the function are carefully controlled



Let's cover some functional terminology:

Callbacks are the functions that are slipped or passed into another function to decide the invocation of that function. You may have seen them passed to other methods, for example in filter, the callback function tells JavaScript the criteria for how to filter an array.

Functions that can be assigned to a variable, passed into another function, or returned from another function just like any other normal value, are called first class functions. In JavaScript, all functions are first class functions.

The functions that take a function as an argument, or return a function as a return value, are called higher order functions.

When functions are passed in to or returned from another function, then those functions which were passed in or returned can be called a lambda.


---------------------------------------- EXAMPLE


// Function that returns a string representing a cup of green tea
const prepareGreenTea = () => 'greenTea';

// Function that returns a string representing a cup of black tea
const prepareBlackTea = () => 'blackTea';

/*
Given a function (representing the tea type) and number of cups needed, the
following function returns an array of strings (each representing a cup of
a specific type of tea).
*/
const getTea = (prepareTea, numOfCups) => {
  const teaCups = [];

  for(let cups = 1; cups <= numOfCups; cups += 1) {
    const teaCup = prepareTea();
    teaCups.push(teaCup);
  }
  return teaCups;
};

const tea4GreenTeamFCC = getTea(prepareGreenTea, 27);
const tea4BlackTeamFCC = getTea(prepareBlackTea, 13);


console.log(
  tea4GreenTeamFCC,
  tea4BlackTeamFCC
);


----------------------------------------

using map:


The map method iterates over each item in an array and returns a new array containing the results of calling the callback function on each element. It does this without mutating the original array.

When the callback is used, it is passed three arguments. The first argument is the current element being processed. The second is the index of that element and the third is the array upon which the map method was called.

const users = [
  { name: 'John', age: 34 },
  { name: 'Amy', age: 20 },
  { name: 'camperCat', age: 10 }
];

const names = users.map(user => user.name)


--------------
creating your own map method using a callback function:

Array.prototype.myMap = function(callback) {
  const newArray = [];

  for (let i = 0; i < this.length; i++) {

    newArray.push(callback(this[i], i, this))
  }
  return newArray;
};

// in JS the map function passes 3 arguments to the callback: the current element, the current elments index, and the entire object.
// in the above code myMap takes a function as an argument. It then calls this function with the three arguments mentioned above.
// that means you can use the myMap function the same way you'd use the map function:

>>>>>>  array.myMap(item, index, array => do something la la la )

// i.e the my map function provides you with the tools to do what you want. clever!



----------------
using indexOf to remove repetition in an array:

[1, 1, 2, 5, 2].filter((element, index, array) => array.indexOf(element) === index)
should return [1, 2, 5] because indexof returns *the first index* that matches the element
so the statement returns false for any repeated numbers.

--------------------------------

The reduce method allows for more general forms of array processing, and it's possible to show that both filter and map can be derived as special applications of reduce. The reduce method iterates over each item in an array and returns a single value (i.e. string, number, object, array). This is achieved via a callback function that is called on each iteration.

The callback function accepts four arguments. The first argument is known as the accumulator, which gets assigned the return value of the callback function from the previous iteration, the second is the current element being processed, the third is the index of that element and the fourth is the array upon which reduce is called.

In addition to the callback function, reduce has an additional parameter which takes an initial value for the accumulator. If this second parameter is not used, then the first iteration is skipped and the second iteration gets passed the first element of the array as the accumulator.

See below for an example using reduce on the users array to return the sum of all the users' ages. For simplicity, the example only uses the first and second arguments.

const users = [
  { name: 'John', age: 34 },
  { name: 'Amy', age: 20 },
  { name: 'camperCat', age: 10 }
];

const sumOfAges = users.reduce((sum, user) => sum + user.age, 0);
console.log(sumOfAges);

--------------------------

const users = [
  { name: 'John', age: 34 },
  { name: 'Amy', age: 20 },
  { name: 'camperCat', age: 10 }
];

const usersObj = users.reduce((obj, user) => {
  obj[user.name] = user.age;
  return obj;
}, {});
console.log(usersObj);

// The console would display the value { John: 34, Amy: 20, camperCat: 10 }.

-----------------------------
function ascendingOrder(arr) {
  return arr.sort(function(a, b) {
    return a - b;
  });
}

// the sort method compares the values of a and b. if the number returned is negative, then a is sorted before b. If positive
// then b is sorted before a, and if 0 then no change is made. These comparisons are made across the whole array.


---------------
using regex to extract words from a string:

function splitify(str) {
return str.split(/[" ",-.]/);
}

console.log(splitify("Hello World,I-am code"));

---------------
currying functions : useful when storing the functions for later because you dont have the value of y yet.

function add(x) {
return function(y) {
  return function(z) {
    return x + y + z;
  }
}
}

add(10)(20)(30);
