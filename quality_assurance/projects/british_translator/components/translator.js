const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  translate(text, locale) {
    let words = text.split(" ")

    let translated = words.map((word) => {
      if (americanOnly[word]) {
        return americanOnly[word]
      } else if (americanToBritishSpelling[word]) {
        return americanToBritishSpelling[word]
      } else if (americanToBritishTitles[word]) {
        return americanToBritishTitles[word]
      } else if (britishOnly[word]) {
        return britishOnly[word]
      } else {
        return word
      }
    })

    console.log(translated.join(" "))
  }

}

module.exports = Translator;
