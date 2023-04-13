const chai = require('chai');
const assert = chai.assert;
const server = require('../server')
const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  test('Translate Mangoes are my favorite fruit. to British English', function(done) {
      let ans = translator.translate("Mangoes are my favorite fruit.", 'american-to-british')
      assert.equal(ans, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
      done()
    });
  test('Translate I ate yogurt for breakfast. to British English', function(done) {
      let ans = translator.translate("I ate yogurt for brekkie.", 'american-to-british')
      assert.equal(ans, 'I ate <span class="highlight">yoghurt</span> for breakfast.')
      done()
    });
  test('Translate We had a party at my friend\'s condo. to British English', function(done) {
      let ans = translator.translate("We had a party at my friend's condo", 'american-to-british')
      assert.equal(ans, "We had a party at my friend's <span class=\"highlight\">flat</span>")
      done()
    });
  test('Translate Can you toss this in the trashcan for me? to British English', function(done) {
      let ans = translator.translate("Can you toss this in the trashcan for me?", 'american-to-british')
      assert.equal(ans, "Can you toss this in the <span class=\"highlight\">bin</span> for me?")
      done()
    });
  test('Translate The parking lot was full. to British English', function(done) {
      let ans = translator.translate("The parking lot was full.", 'american-to-british')
      assert.equal(ans, "The <span class=\"highlight\">garage</span> was full.")
      done()
    });
})






// Translate Like a high tech Rube Goldberg machine. to British English
// Translate To play hooky means to skip class or work. to British English
// Translate No Mr. Bond, I expect you to die. to British English
// Translate Dr. Grosh will see you now. to British English
// Translate Lunch is at 12:15 today. to British English
// Translate We watched the footie match for a while. to American English
// Translate Paracetamol takes up to an hour to work. to American English
// Translate First, caramelise the onions. to American English
// Translate I spent the bank holiday at the funfair. to American English
// Translate I had a bicky then went to the chippy. to American English
// Translate I've just got bits and bobs in my bum bag. to American English
// Translate The car boot sale at Boxted Airfield was called off. to American English
// Translate Have you met Mrs Kalyani? to American English
// Translate Prof Joyner of King's College, London. to American English
// Translate Tea time is usually around 4 or 4.30. to American English
// Highlight translation in Mangoes are my favorite fruit.
// Highlight translation in I ate yogurt for breakfast.
// Highlight translation in We watched the footie match for a while.
// Highlight translation in Paracetamol takes up to an hour to work.
