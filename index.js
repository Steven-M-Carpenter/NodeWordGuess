var readEachLineSync = require('read-each-line-sync')
var inquirer = require("inquirer");
var Word = require("./word");

var selectedWord;
var word;


function chooseWordFromFile() {
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    var counter = 1;
    readEachLineSync('./wordFile.txt', 'utf8', function (line) {
        if (counter === randomNumber) {
            selectedWord = line;
            counter++;
        } else {
            counter++;
        }
    })
    console.log("selectedWord = " + selectedWord);
    return selectedWord;
};


function isALetter(guess) {
    var validLetters = "abcdefghijklmnopqrstuvwxyz";
    // if (guess === /[a-z]/i) {
    if (validLetters.indexOf(guess) >= 0) {
        return true;
    } else {
        console.log("You must enter a letter! \n");
    }
}

function playTurn() {
    word.showWord();
    inquirer.prompt([
        {
            name: 'guess',
            message: 'Enter a letter of your choosing --> '
        }
    ]).then(function(response) {
        var guess = response.guess.toLowerCase();
        console.log("guess: " + guess);
    if (isALetter(guess) === true) {
        if (word.validateLetter(guess) === 0) {
            newGame();
        } else {
            playTurn();
        }
    } else {
        playTurn();
    }
});
};


function newGame() {
    inquirer.prompt([
        {
         type: 'confirm',
         name: 'newgame',
         message: 'Would you like to play again? ',
         default: false   
        }
    ]).then(function(response) {
        if (response.newgame === true) {
            playGame();
        } else {
            process.exit;
        }
    });
};


function playGame() {
    console.clear();
    chooseWordFromFile();
    word = new Word(selectedWord);
    word.loadLetters();
    playTurn();
}


playGame();