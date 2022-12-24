function rot13(str) {
  let result = [];
  let letters = {
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6,
    'G': 7,
    'H': 8,
    'I': 9,
    'J': 10,
    'K': 11,
    'L': 12,
    'M': 13,
    'N': 14,
    'O': 15,
    'P': 16,
    'Q': 17,
    'R': 18,
    'S': 19,
    'T': 20,
    'U': 21,
    'V': 22,
    'W': 23,
    'X': 24,
    'Y': 25,
    'Z': 26
  }

  let chars = str.split("")

  for (let n = 0; n < chars.length; n++) {
    let encrpted = chars[n]
    if (letters.hasOwnProperty(encrpted) == false) {
      result.push(encrpted)
    } else {
      if (letters[encrpted] <= 13) {
        let anscode = Object.keys(letters).find(key => letters[key] == letters[encrpted] + 13)
        result.push(anscode)
      } else {
        let anscode = Object.keys(letters).find(key => letters[key] == letters[encrpted] - 13)
        result.push(anscode)
      }
    }
  }

  console.log(result.join(""))
  return result.join("")
  }

  rot13("SERR PBQR PNZC");
