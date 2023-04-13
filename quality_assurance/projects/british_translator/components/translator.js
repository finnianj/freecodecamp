const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  translate(text, locale) {
    let words = text.split(" ")

    let translated = words.map((word) => {
      let reg = /\d{1,2}:\d{1,2}/
      let reg2 = /\d{1,2}\.\d{1,2}/

      if (reg.test(word)) {
        return word.replace(/:/, '.')
      } else if (reg2.test(word)) {
        return word.replace(/\./, ':')
      }

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
