var nlp = require('compromise')

var doc = nlp('London is calling')
let neg = doc.sentences().toNegative() 

////////////////////////////////////////////////
//
//             Parsing

nlp(`we don't need no education`).out('text') // we don't need no education
// That's not useful, but it quietly does a full parsing and deconstruction of the text, then pulls it all back together into
// 'pixel-perfect' text again the .out('text') bit handles whitespace, unicode, typos, all-of-that.


////////////////////////////////////////////////
//
//             Contractions

// Well, once we have it all parsed-up, we ought to do something:
let doc1 = nlp(`we don't need no education`)
doc1.contractions().expand()
doc1.out('text') // we do not need no education

// this shows the silent interpretation of the words in the text.

// 1) We did not tell it which words were contractions
// 2) We did not fret about inserting & removing new words
// 3) We did not need to needlessly re - parse our text afterwards
// we grabbed a particular piece of the text by calling.contractions().
// It found the term "don't", and it didn't care how many matches there were.

// When we enter text, compromise splits it up into sentences+terms, 
// and tags each word with a bunch of metadata that it can figure-out.

////////////////////////////////////////////////
//
//             Tags

nlp(`don't odyssey`).contractions().length /*?*/
nlp(`homer's odyssey`).contractions().length /*?*/
// ^^ Can differentiate different contraction 

nlp(`homer's odyssey`).out('tags') // Object

// but perhaps the most useful(and quick!) way to query about a term's tags is to use the .match() syntax. 
// This is a custom-but-approachable regex-like way of searching within a document.


////////////////////////////////////////////////
//
//             Matching (Regex like)

// you can search any words, but a tag is represented with a # symbol, like this:
nlp('Hey, teacher! leave those kids alone').match('those #Plural').out('text')

// this searches the document for any times the word 'those' (under any capitalization, punctuation, whitespace...) 
// is followed by a word with a #Plural tag. It can return thousands of matches, or 0 - either way, 
// you can still call .out() or any other methods, on the results.

////////////////////////////////////////////////
//
//             Smart matching

nlp('Somebody once told me the world was gonna roll me.').match('the .').out('text') // the world

// here we're using the 
// --> '.' character to mean 'any single term'. 
//     ▔▔▔
// We also support 
// --> '*' for any consecutive terms, 
//     ▔▔▔
// --> '+' for repeating matches, and so forth.
//     ▔▔▔
// In all, it aims to be a really easy way to 'zoom-in' to specific parts of text, using any sort of pattern.
// Once we're there, we can grab it's data, or make changes to it.

////////////////////////////////////////////////
//
//             Custom Tags

// compromise runs its own tagging right when you enter a text, but you can tag things yourself, 
// for deeper custom parsing, or to fix mistakes:

let doc2 = nlp('i went and saw Boston') //interprets this as a #Place
//grab the one word..
let word = doc2.match('boston')
//give it a new tag,
word.tag('RockBand')
//now this word can be found this way:
doc2.match('#RockBand').out('text') /*?*/

// this may seem to work, but we introduced a new tag, #RockBand and haven't told compromise what a RockBand is yet. 
// You can see, if you run .out('tags'), the word 'Boston' is both a #RockBand and a #Place.

// The internal tags in compromise already know that you can't be a #Noun and a #Verb at the same time, 
// for example. We can tell compromise about this like so:

//declare new tags in a plugin,
let plugin = {
  tags: {
    RockBand: {
      isA: 'Organization'
    }
  }
}
nlp.plugin(plugin)
//parse the document again
let doc3 = nlp('boston was loud')
//grab the word, and tag it
doc3.match('boston').tag('RockBand') /*?*/
//see if it's still a #Place now
doc3.match('#Place').length /*?*/

// it's clever-enough to know that since an #Organization is not a #Place, a #RockBand isn't either.

// this is just the beginning of the use of compromise plugins, which are pretty cool.