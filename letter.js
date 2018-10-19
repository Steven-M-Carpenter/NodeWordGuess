var Letter = function(passedLetter) {
    this.letter = passedLetter;
    this.show = false;
    this.placeholder = "_ ";
    this.showLetter = function (guessedLetter) {
        if (this.guessedLetter === this.passedLetter) {
            this.show = true;
        }
    };
};

module.exports = Letter;