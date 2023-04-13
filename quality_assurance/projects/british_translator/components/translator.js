const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  translate(text, locale) {
    let words = text.split(" ")
    let translationMade = false

    let translated = words.map((word) => {
      let reg = /\d{1,2}:\d{1,2}/
      let reg2 = /\d{1,2}\.\d{1,2}/
      let span = '<span class="highlight">'
      let spanEnd = '</span>'
      let newWord;

      if (reg.test(word)) {
        newWord = word.replace(/:/, '.')
      } else if (reg2.test(word)) {
        newWord = word.replace(/\./, ':')
      }

      if (americanOnly[word]) {
        newWord = americanOnly[word]
      } else if (americanToBritishSpelling[word]) {
        newWord = americanToBritishSpelling[word]
      } else if (americanToBritishTitles[word]) {
        newWord = americanToBritishTitles[word]
      } else if (britishOnly[word]) {
        newWord = britishOnly[word]
      }

      if (newWord != undefined) {
        translationMade = true
        return `${span}${newWord}${spanEnd}`
      } else {
        return word
      }

    })

    if (translationMade) {
      console.log("No translation needed")
      return undefined
    }
    return translated.join(" ")
  }

}

module.exports = Translator;
