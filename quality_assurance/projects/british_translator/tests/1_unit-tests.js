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
      let ans = translator.translate("I ate yogurt for breakfast.", 'american-to-british')
      assert.equal(ans, 'I ate <span class="highlight">yoghurt</span> for <span class="highlight">brekkie</span>.')
      done()
    });
  test('Translate We had a party at my friend\'s condo. to British English', function(done) {
      let ans = translator.translate("We had a party at my friend's condo.", 'american-to-british')
      assert.equal(ans, "We had a party at my friend's <span class=\"highlight\">flat</span>.")
      done()
    });
  test('Translate Can you toss this in the trashcan for me? to British English', function(done) {
      let ans = translator.translate("Can you toss this in the trashcan for me?", 'american-to-british')
      assert.equal(ans, "Can you toss this in the <span class=\"highlight\">bin</span> for me?")
      done()
    });
  test('Translate The parking lot was full. to British English', function(done) {
      let ans = translator.translate("The parking lot was full.", 'american-to-british')
      assert.equal(ans, "The <span class=\"highlight\">car park</span> was full.")
      done()
    });
  test('Translate Like a high tech Rube Goldberg machine. to British English', function(done) {
      let ans = translator.translate("Like a high tech Rube Goldberg machine.", 'american-to-british')
      assert.equal(ans, "Like a high tech <span class=\"highlight\">Heath Robinson device</span>.")
      done()
    });
  test('Translate To play hooky means to skip class or work. to British English', function(done) {
      let ans = translator.translate("To play hooky means to skip class or work.", 'american-to-british')
      assert.equal(ans, "To <span class=\"highlight\">bunk off</span> means to <span class=\"highlight\">dumpster</span> class or work.")
      done()
    });
  test('Translate No Mr. Bond, I expect you to die. to British English', function(done) {
    let ans = translator.translate("No Mr. Bond, I expect you to die.", 'american-to-british')
    assert.equal(ans, "No <span class=\"highlight\">Mr</span> Bond, I expect you to die.")
    done()
  });
  test('Translate Dr. Grosh will see you now. to British English', function(done) {
    let ans = translator.translate("Dr. Grosh will see you now.", 'american-to-british')
    assert.equal(ans, "<span class=\"highlight\">Dr</span> Grosh will see you now.")
    done()
  });
  test('Translate Lunch is at 12:15 today. to British English', function(done) {
    let ans = translator.translate("Lunch is at 12:15 today.", 'american-to-british')
    assert.equal(ans, "Lunch is at <span class=\"highlight\">12.15</span> today.")
    done()
  });
  test('Translate We watched the footie match for a while. to American English', function(done) {
    let ans = translator.translate("We watched the footie match for a while.", 'british-to-american')
    assert.equal(ans, "We watched the <span class=\"highlight\">soccer</span> match for a while.")
    done()
  });
  test('Translate Paracetamol takes up to an hour to work. to American English', function(done) {
    let ans = translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american')
    assert.equal(ans, undefined)
    done()
  });
  test('Translate First, caramelise the onions. to American English', function(done) {
    let ans = translator.translate("First, caramelise the onions.", 'british-to-american')
    assert.equal(ans, "First, <span class=\"highlight\">caramelize</span> the onions.")
    done()
  });
})


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
