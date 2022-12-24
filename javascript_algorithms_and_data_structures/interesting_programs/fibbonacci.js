function sumFibs(num) {
  let arr = [1, 1]

    for (let n = 1, ans = 0; ans <= num; n++) {
      ans = arr[n-1] + arr[n]
      if (ans <= num) {
        arr.push(ans)
      }
    }

  let odds = arr.filter(num => num % 2 == 1)
  let sum = odds.reduce((sum, number) => sum + number, 0)
  return sum;
  }

  sumFibs(13);


  // Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.

  // The first two numbers in the Fibonacci sequence are 1 and 1. Every additional number in the sequence is the sum of the two previous numbers. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

  // For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than or equal to 10 are 1, 1, 3, and 5.


  function sumPrimes(num) {
    let arr = [2];

    for (let n = 3; n <= num; n++) {
      let numsbelown = []
      for (let j = 2; j < n; j++) {
        numsbelown.push(j)
      }
      if (numsbelown.every(num => n % num != 0)) {
        arr.push(n)
      }
    }
    return arr.reduce((sum, num) => sum + num, 0);
  }

  sumPrimes(100);

// A prime number is a whole number greater than 1 with exactly two divisors: 1 and itself. For example, 2 is a prime number because it is only divisible by 1 and 2. In contrast, 4 is not prime since it is divisible by 1, 2 and 4.

// Rewrite sumPrimes so it returns the sum of all prime numbers that are less than or equal to num.

function dropElements(arr, func) {

  let ans = []

      for (let n = 0; n < arr.length; n++) {
        if (func(arr[n]) == true) {
          ans = arr.slice(n)
          console.log(ans);
          return ans
        }
      }
      return [];
   }

  dropElements([1, 2, 3], function(n) {return n > 0; });

// Given the array arr, iterate through and remove each element starting from the first element (the 0 index) until the function func returns true when the iterated element is passed through it.

// Then return the rest of the array once the condition is satisfied, otherwise, arr should be returned as an empty array.


function steamrollArray(arr) {
  let ans = []
  tingo(arr)

  function tingo(arr) {
    for (let n = 0; n < arr.length; n++) {
      if (Array.isArray(arr[n])) {
        tingo(arr[n])
      } else if (typeof arr[n] == 'number' || 'string'){
        ans.push(arr[n])
        // console.log(arr[n])
      } else if (typeof arr[n] == 'object'){
        ans.push(arr[n])
        // console.log(arr[n])
      }
    }
  }

  console.log(ans)
    return ans;
  }

  steamrollArray([1, [2], [3, [[4]]]]);
  steamrollArray([1, {}, [3, [[4]]]]);
  steamrollArray([[["a"]], [["b"]]])

//Flatten a nested array. You must account for varying levels of nesting.

function binaryAgent(str) {
  let letters = str.split(" ")
  let ans = []
  for (let n = 0; n < letters.length; n++) {
    ans.push(String.fromCharCode(parseInt(letters[n], 2)))
  }

  return ans.join("");
}

// binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");
// the separate binary chunks convert in utf-8 codes, which convert into individual characters.
