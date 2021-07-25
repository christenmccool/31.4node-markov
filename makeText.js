/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const {MarkovMachine} = require('./markov');

async function generateMarkovText(flag, source, numWords) {
    if (flag === "file") {
        fs.readFile(source, 'utf8', (err, data) => {
            if (err) {
                console.log(`${err}`);
                process.kill(1)
            } 
            let mm = new MarkovMachine(data);
            let text = mm.makeText(numWords=10);
            console.log(text);
            return text;
        })
    } else if (flag === "url") {
        try {
            let response = await axios.get(source);
            let mm = new MarkovMachine(response.data);
            let text = mm.makeText(numWords=10);
            console.log(text);
            return text;
        } catch(err) {
            console.log(`${err}`);
            process.kill(1)
        }
    }
}

let flag = process.argv[2];
let source = process.argv[3];

generateMarkovText(flag, source);

