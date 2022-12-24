function convertToRoman(num) {
  let result = [];
  let stringy = num.toString().split("")

  for (let n = stringy.length - 1; n >= 0; n--) {
    let item = parseInt(stringy[0], 10)
    stringy.shift()
    if (n == 0) {
      result.push(singles(item))
    } else if (n == 1) {
      result.push(tens(item))
    } else if (n == 2) {
      result.push(hundreds(item))
    } else if (n == 3) {
      result.push(thousands(item))
    }
  }

function singles(item) {
  if (item == 1) {
     return "I"
   } else if (item == 2) {
     return "II"
   } else if (item == 3) {
     return "III"
   } else if (item == 4) {
     return "IV"
   } else if (item == 5) {
     return "V"
   } else if (item == 6) {
     return "VI"
   } else if (item == 7) {
     return "VII"
   } else if (item == 8) {
     return "VIII"
   } else if (item == 9) {
     return "IX"
   } else if (item == 0) {
     return ""
   }
}

function tens(item) {
   if (item == 1) {
     return "X"
   } else if (item == 2) {
     return "XX"
   } else if (item == 3) {
     return "XXX"
   } else if (item == 4) {
     return "XL"
   } else if (item == 5) {
     return "L"
   } else if (item == 6) {
     return "LX"
   } else if (item == 7) {
     return "LXX"
   } else if (item == 8) {
     return "LXXX"
   } else if (item == 9) {
     return "XC"
   } else if (item == 0) {
     return ""
   }
}

function hundreds(item) {
   if (item == 1) {
     return "C"
   } else if (item == 2) {
     return "CC"
   } else if (item == 3) {
     return "CCC"
   } else if (item == 4) {
     return "CD"
   } else if (item == 5) {
     return "D"
   } else if (item == 6) {
     return "DC"
   } else if (item == 7) {
     return "DCC"
   } else if (item == 8) {
     return "DCCC"
   } else if (item == 9) {
     return "CM"
   } else if (item == 0) {
     return ""
   }
}

function thousands(item) {
   if (item == 1) {
     return "M"
   } else if (item == 2) {
     return "MM"
   } else if (item == 3) {
     return "MMM"
   }
}

  console.log(result)

 return result.join("");
}

convertToRoman(83);
