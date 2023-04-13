const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')


class Translator {

  replaceWords(key, value, text, type) {
    let keyReg = new RegExp("\\b" + `${key}` + "\\b");
    let valReg = new RegExp("\\b" + `${value}` + "\\b");
    if (keyReg.test(text)) {
      console.log("replacing key with value " + type)
      return text.replace(key, `<span class="highlight">${value}</span>`)
    }
    if (valReg.test(text)) {
      console.log("replacing value with key " + type)
      return text.replace(value, `<span class="highlight">${key}</span>`)
    }
    return text
  }

  translate(text, _locale) {
    let original = text.split("").join("")

    for (const [key, value] of Object.entries(americanOnly)) {
      text = this.replaceWords(key, value, text, 'AO')
    }
    for (const [key, value] of Object.entries(americanToBritishSpelling)) {
      text = this.replaceWords(key, value, text, 'ATBS')
    }
    for (const [key, value] of Object.entries(americanToBritishTitles)) {
      text = this.replaceWords(key, value, text, 'ATBT')
    }
    for (const [key, value] of Object.entries(britishOnly)) {
      text = this.replaceWords(key, value, text, 'BO')
    }
    console.log(original)
    console.log(text)

    if (original == text) return undefined

    return text

  }




    // let words = text.split(" ")

    // let translated = words.map((word) => {
    //   let reg = /\d{1,2}:\d{1,2}/
    //   let reg2 = /\d{1,2}\.\d{1,2}/
    //   let span = '<span class="highlight">'
    //   let spanEnd = '</span>'
    //   let newWord;

    //   if (reg.test(word)) {
    //     newWord = word.replace(/:/, '.')
    //   } else if (reg2.test(word)) {
    //     newWord = word.replace(/\./, ':')
    //   }

    //   for (const [key, value] of Object.entries(americanOnly)) {
    //     if (key == word) newWord = value
    //     if (value == word) newWord = key
    //   }

    //   for (const [key, value] of Object.entries(americanToBritishSpelling)) {
    //     if (key == word) newWord = value
    //     if (value == word) newWord = key
    //   }

    //   for (const [key, value] of Object.entries(americanToBritishTitles)) {
    //     if (key == word) newWord = value
    //     if (value == word) newWord = key
    //   }

    //   for (const [key, value] of Object.entries(britishOnly)) {
    //     if (key == word) newWord = value
    //     if (value == word) newWord = key
    //   }

    //   if (newWord != undefined) {
    //     return `${span}${newWord}${spanEnd}`
    //   } else {
    //     return word
    //   }

    // })

    // if (translated.join(" ") == words.join(" ")) {
    //   console.log("No translation needed")
    //   return undefined
    // }
    // return translated.join(" ")


}

module.exports = Translator;
