const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')


class Translator {

  replaceWords(key, value, text, type) {
    let keyReg = new RegExp("\\b" + `${key}` + "\\b");
    let valReg = new RegExp("\\b" + `${value}` + "\\b");
    // the regex for changing titles is slightly modified as it must match 'Mr.' and words with '.'
    if (type == 'ATBT') keyReg = new RegExp("\\b" + `${key}` + "\.\\b");
    if (keyReg.test(text)) {
      console.log(`replacing ${key} with ${value} ` + type)
      return text.replace(key, `<span class="highlight">${value}</span>`)
    }
    if (valReg.test(text)) {
      console.log(`replacing ${value} with ${key} ` + type)
      return text.replace(value, `<span class="highlight">${key}</span>`)
    }
    return text
  }

  translate(text, _locale) {
    let original = text.split("").join("")
    let dateReg = /[:|\.](?=\d)/
    if (text.match(dateReg)) {
      let t = text.match(/\d{1,2}[:|\.]\d{1,2}/)[0]
      t = t.match(dateReg)[0] == ':' ? t.replace(dateReg, '.') : t.replace(dateReg, ':')
      text = text.replace(/\d{1,2}[:|\.]\d{1,2}/, `<span class="highlight">${t}</span>`)
    }

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

}

module.exports = Translator;
