

var selectedWord;
var wordArray;
var guessedLetters = [];
var displayWord = '';
var theLetter;
var turns;
var lettersLeft;

function chooseWordFromFile() {
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    var counter = 1;
    var readEachLineSync = require('read-each-line-sync')

    readEachLineSync('./wordFile.txt', 'utf8', function (line) {
        if (counter === randomNumber) {
            selectedWord = line;
            lettersLeft = selectedWord.length;
            console.log("LetLeft: " + lettersLeft);
            turns = lettersLeft + 5;
            counter++;
        } else {
            counter++;
        }
    })
};

function disectInputWord(inputWord) {
    console.log("selectedWord = " + inputWord);
    wordArray = inputWord.split("");
    for (i = 0; i < wordArray.length; i++) {
        guessedLetters.push("_ ");
    }

};

function visibleLetters(passedWArray, passedGLArray) {
    // var displayWord;
    for (i = 0; i < passedGLArray.length; i++) {
        if (passedGLArray[i]) {
            displayWord += passedWArray[i] + ' ';
        } else {
            displayWord += '_ ';
        }
    }
    console.log("TheWord = " + displayWord);
}

function checkLetter(passedLetter) {
    console.log("chosen Letter = " + passedLetter);
    var letterCount = 0;
    var initialMatch = false;
    var checkIndex;

    for (i = 0; i < wordArray.length; i++) {
        if (wordArray[i] === passedLetter) {
            letterCount++;
        }
    }
    if (letterCount > 0) {
        console.log("letter Count =  " + letterCount);
        for (j = 0; j < letterCount; j++) {
            checkIndex = wordArray.indexOf(passedLetter);
            wordArray[checkIndex] = "_ ";
            guessedLetters[checkIndex] = passedLetter;
            console.log("GL: " + guessedLetters.join(" "));
            console.log("WA: " + wordArray.join(" "));
        }
    } else {
        //deduct turns
    }
    lettersLeft -= letterCount;
    console.log("LL: " + lettersLeft);
}



function userGuess() {
    var inquirer = require('inquirer');
    var letterPrompt = [
        {
            message: "Please enter a letter ==>",
            type: "input",
            name: "chosenLetter",
            validate: function (value) {
                var letter = value.match(
                    /[a-zA-Z]/
                );
                if (letter) {
                    return true;
                }

                return 'Please enter a valid letter';
            }
        }];
    inquirer.prompt(letterPrompt).then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
        theLetter = answers.chosenLetter
        console.log("TL = " + theLetter);
        checkLetter(theLetter);

    });
}

chooseWordFromFile();
disectInputWord(selectedWord);
// while ((turns > 0) && (lettersLeft > 0)) {
    userGuess();
// };

// chooseWordFromFile();
// disectInputWord(selectedWord);
// console.log("WordArray = " + wordArray);
// console.log("guessLetters = " + guessedLetters);
// visibleLetters(wordArray, guessedLetters);


