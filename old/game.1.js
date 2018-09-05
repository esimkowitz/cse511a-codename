// TODO: make object-oriented
const numButtons = 4;

class SimonSays {
    constructor() {
        this.numButtons = 4;
        this.currentScore = 0;
        this.gameIndex = 0;
        this.gameArr = [];
        this.buttons = [];
        var buttonElements = document.getElementsByClassName("simonsays-button");
        for (var index in buttonElements) {
            if (index < numButtons) {
                this.buttons.push({
                    "element": buttonElements[index],
                    "id": buttonElements[index].id
                });
            }
        }
        console.log(this.buttons);
    }

    newRound(gameLength = 2) {
        this.gameArr = [];
        for (var i = 0; i < gameLength; i++) {
            var nextButtonIndex = Math.floor(Math.random() * this.numButtons);
            this.gameArr.push(nextButtonIndex);
        }

        this.newPattern(this.receivePattern);
    }
    getCurrentButton() {
        return this.buttons[this.gameArr[this.gameIndex]];
    }
    newPattern(callback) {
        var gameLength = this.gameArr.length;
        this.gameIndex = 0;
        var gameInterval = setInterval(() => {
            var currentButton = this.getCurrentButton();
            try {
                currentButton.element.classList.add("active");
            } catch (error) {}

            setTimeout(() => {
                try {
                    currentButton.element.classList.remove("active");
                } catch (error) {}
            }, 200);

            this.gameIndex++;
            if (gameIndex >= gameLength) {
                clearInterval(gameInterval);
                callback();
            }
        }, 500);
    }
    updateGameScore(newScore) {
        // console.log("updating score to " + newScore);
        this.currentScore = newScore;
        document.getElementById("score").innerText = currentScore;
    }
    addGameScore(addScore) {
        var newScore = this.currentScore + addScore;
        this.updateGameScore(newScore);
    }
    clearGameScore() {
        this.updateGameScore(0);
    }
    clickEventHandler(event) {
        var gameLength = this.gameArr.length;
        // console.log("click", event, event.target.id);
        // console.log(buttons[gameArr[gameIndex]]);
        if (event.target.id === this.getCurrentButton().id) {
            console.log("successful click");
            this.gameIndex++;
        } else {
            this.clearGameScore();
            document.getElementById("simonsays-game").removeEventListener("click", this.clickEventHandler);
            return;
        }

        if (gameIndex >= gameLength) {
            document.getElementById("simonsays-game").removeEventListener("click", this.clickEventHandler);
            this.addGameScore(1);
            setTimeout(() => {
                this.newRound(gameLength + 1);
            }, 1000);
        }
    }
    receivePattern(gameArr) {
        this.gameIndex = 0;
        document.getElementById("simonsays-game").addEventListener("click", this.clickEventHandler);
    }
    startGame(_this) {
        console.log("starting game");
        try {
            document.getElementById("simonsays-game").removeEventListener("click", this.clickEventHandler);
        } catch (error) {}
        _this.clearGameScore();
        _this.newRound();
    }
}

var simonsays = new SimonSays();
document.getElementById("start-game").addEventListener("click", simonsays.startGame);
