const {MarkovMachine} = require('./markov');

let input, mm, text;

describe("Test Markov Machine", function() {
    beforeEach(function () {
        input = "the cat in the hat"
        mm = new MarkovMachine(input);
        text = mm.makeText(numWords=10);
    })

    test('Should return a string ', function() {
        expect(text).toEqual(expect.any(String));
    })

    test('Returned string should be no longer than the numWords argument', function() {
        let textArr = text.split(" ");
        expect(textArr.length).toBeLessThanOrEqual(10);
    })

    test('Every sequential pair of words should be found in the original string', function() {
        let textArr = text.split(" ");
        for (let i = 0; i < textArr.length - 1; i++) {
            let pair = textArr.slice(i, i+2).join(" ")
            expect(input).toContain(pair);
        }
    })

})
