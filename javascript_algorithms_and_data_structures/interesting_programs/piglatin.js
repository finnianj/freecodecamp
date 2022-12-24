function translatePigLatin(str) {

  let letters = str.split("")

  let ans = letters.indexOf(letters.find(letter => letter.match(/[aeiou]/)))

if (ans == 0) {
  letters = [...letters, 'w', 'a', 'y'];
} else {
    let cut = letters.splice(0, ans)
    letters = [...letters, ...cut, 'a', 'y']
}

  console.log(letters.join(""));
  return letters.join("");
}

translatePigLatin("consonant");

// Pig Latin is a way of altering English Words. The rules are as follows:

// - If a word begins with a consonant, take the first consonant or consonant cluster, move it to the end of the word, and add ay to it.

// - If a word begins with a vowel, just add way at the end.
