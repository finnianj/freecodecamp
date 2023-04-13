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
      let span = '<span class="highlight">'
      let spanEnd = '</span>'
      let newWord;

      if (reg.test(word)) {
        newWord = word.replace(/:/, '.')
      } else if (reg2.test(word)) {
        newWord = word.replace(/\./, ':')
      }

      for (const [key, value] of Object.entries(americanOnly)) {
        if (key == word) newWord = value
        if (value == word) newWord = key
      }

      for (const [key, value] of Object.entries(americanToBritishSpelling)) {
        if (key == word) newWord = value
        if (value == word) newWord = key
      }

      for (const [key, value] of Object.entries(americanToBritishTitles)) {
        if (key == word) newWord = value
        if (value == word) newWord = key
      }

      for (const [key, value] of Object.entries(britishOnly)) {
        if (key == word) newWord = value
        if (value == word) newWord = key
      }

      if (newWord != undefined) {
        return `${span}${newWord}${spanEnd}`
      } else {
        return word
      }

    })

    if (translated.join(" ") == words.join(" ")) {
      console.log("No translation needed")
      return undefined
    }
    return translated.join(" ")
  }

}

module.exports = Translator;
