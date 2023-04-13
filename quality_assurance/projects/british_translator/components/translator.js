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
      let spanEnd = '</span'
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
      } else {
        newWord = word
      }

      if (newWord != '') {
        return `${span}${newWord}${spanEnd}`
      } else {
        return word
      }
      
    })

    console.log(translated.join(" "))
    return translated.join(" ")
  }

}

module.exports = Translator;
