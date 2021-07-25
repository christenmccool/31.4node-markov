/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeBigramChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
    makeBigramChains() {
      this.chains = {}
      for (let i = 0; i < this.words.length - 1; i++) {
          let pair = this.words.slice(i, i+2).join(" ");
          let next = this.words[i+2] || null;

          if (pair in this.chains) {
              this.chains[pair].push(next)
          } else {
              this.chains[pair] = [next];
          }
      }
    }
  
  
    /** return random text from chains */
  
    makeText(numWords = 100) {
      const numWordsAv = Object.keys(this.chains).length;
      let randNum, text;
      
      do {
        randNum = Math.floor(Math.random() * numWordsAv);
        text = [Object.keys(this.chains)[randNum]];
      } while (text[0][0] === text[0][0].toLowerCase())

      if (text[0].slice(-1) === '.') {
        return text.toString();
      }
      text = text[0].split(" ");

      for (let i = 0; i < numWords - 2; i++) {
        let pair = text.slice(i, i+2).join(" ");

        let randNum = Math.floor(Math.random() * this.chains[pair].length);
        if (this.chains[pair][randNum] === null ) {
          break;
        } else {
          text.push(this.chains[pair][randNum])
          if (this.chains[pair][randNum].slice(-1) ==='.') break;
        }
      }
      return text.join(" ")
    }
  
  }
  
  
  module.exports = {MarkovMachine}
  
  let mm = new MarkovMachine("I am Sam. Sam I am. So are you. So are you too. You are you too.");
  let text = mm.makeText(numWords=10);
  console.log(text)
