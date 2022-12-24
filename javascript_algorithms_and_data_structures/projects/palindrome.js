function palindrome(str) {
  let regex = /\W+/g
  let und = /_/g
  let one = (str.replace(regex, ""))
  let two = (one.replace(und, "")).toLowerCase();
  if (two == two.split("").reverse().join("")) {
    return true;
  } else {
    return false;
  }
}

palindrome("eye");
palindrome("A man, a plan, a canal. Panama");
palindrome("0_0 (: /-\ :) 0-0");



function convertToRoman(num) {
  let arr = [];
  let i = Math.floor(num / 10)
  let r = num % 10

  if (i == 5) {
    arr.push("L")
    } else if (i == 4) {
      arr.push("XL")
    } else if (i > 5 && i < 9) {
        arr.push("L")
        for (let n = 1; n <= i - 5; n++) {
          arr.push("X")
        }
    } else if (i == 9) {
      arr.push("XC")
    }



   if (r == 1) {
     arr.push("I")
   } else if (r == 2) {
     arr.push("II")
   } else if (r == 3) {
     arr.push("III")
   } else if (r == 4) {
     arr.push("IV")
   } else if (r == 5) {
     arr.push("V")
   } else if (r == 6) {
     arr.push("VI")
   } else if (r == 7) {
     arr.push("VII")
   } else if (r == 8) {
     arr.push("VIII")
   } else if (r == 9) {
     arr.push("IX")
   } else if (r == 10) {
     arr.push("X")
   }



   console.log(arr)
   console.log(4/1)
   return arr.join("")
  }

  convertToRoman(12);
