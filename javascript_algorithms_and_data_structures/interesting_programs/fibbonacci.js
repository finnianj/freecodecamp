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
