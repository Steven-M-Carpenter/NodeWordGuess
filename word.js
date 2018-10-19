var Letter = require('./letter.js');

var Word = function (passedWord) {
    this.word = passedWord;
    this.wordLen = passedWord.length;
    this.letterArray = [];
    this.letterDisplay = [];
    this.lettersGuessed = [];
    this.guessesToGo = 10;
    this.loadLetters = function () {
        for (i = 0; i < this.wordLen; i++) {
            var letter = new Letter(this.word.charAt([i]));
            this.letterArray.push(letter);
        };
    };
    this.showWord = function () {
        this.letterDisplay = [];
        for (letterIndex in this.letterArray) {
            if (this.letterArray[letterIndex].show === true) {
                this.letterDisplay.push(this.letterArray[letterIndex].letter + " ")
            } else {
                this.letterDisplay.push('_ ')
            };
        };
        console.log("\n\n" + this.letterDisplay.join(" ") + "\n\n");
    };
    this.validateLetter = function (guess) {
        var repeatLetter = false;
        // Already guessed this letter
        if (this.lettersGuessed.indexOf(guess) >= 0) {
            repeatLetter = true;
            console.log("\n\n You've already tried that.  Here are your past guesses:  \n\n");
            console.log(this.lettersGuessed + "\n");
        }
        var lettersLeft = 0;
        this.lettersGuessed.push(guess);

        // Not a prior guess.  Let's see if it's in the word
        if (this.word.indexOf(guess) >= 0) {
            for (letterIndex of this.letterArray) {
                if (letterIndex.letter === guess) {
                    letterIndex.show = true;
                }

                // Count how many letters remain to be guessed
                if (letterIndex.show === false) {
                    lettersLeft++;
                }
            }
            if (lettersLeft === 0) {
                console.log("\n\n ********  Victory!!!  ********\n\n");
                return lettersLeft;
            }
        }

        // If the letter is not in the word and not a duplicate letter do this
        if ((this.word.indexOf(guess) < 0) && (repeatLetter === false)) {
            this.guessesToGo--;
            console.log("\n\n Incorrect.  You have " + this.guessesToGo + " turns remaining. \n\n");
            if (this.guessesToGo < 1) {
                console.log("\n\n Out of turns!  The word was ===> " + this.word + "\n\n");
                return this.guessesToGo;
            }
        }
    }
};

module.exports = Word;
