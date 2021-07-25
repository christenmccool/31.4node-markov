/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {}
    for (let i = 0; i < this.words.length - 1; i++) {
      if (this.words[i] in this.chains) {
        this.chains[this.words[i]].push(this.words[i+1]);
      } else {
        this.chains[this.words[i]] = [this.words[i+1]];
      }
    }
    if (this.words[this.words.length - 1] in this.chains) {
      this.chains[this.words[this.words.length-1]].push(null);
    } else {
      this.chains[this.words[this.words.length-1]] = [null];
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    const numWordsAv = Object.keys(this.chains).length;
    let randNum, text;
    do {
      randNum = Math.floor(Math.random() * numWordsAv);
      text = [Object.keys(this.chains)[randNum]];
    } while (text[0] === text[0].toLowerCase())

    if (text[0].slice(-1) === '.') {
      return text.toString();
    }
    
    for (let i = 0; i < numWords - 1; i++) {
      let randNum = Math.floor(Math.random() * this.chains[text[i]].length);
      if (this.chains[text[i]][randNum] === null ) {
        break;
      } else {
        text.push(this.chains[text[i]][randNum])
        if (this.chains[text[i]][randNum].slice(-1) ==='.') break;
      }
    }
    return text.join(" ")
  }

}


module.exports = {MarkovMachine}

let mm = new MarkovMachine("I am Sam. Sam I am. So are you. You are you too.");
let text = mm.makeText(numWords=10);
console.log(text)