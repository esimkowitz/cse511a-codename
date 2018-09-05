// TODO: make object-oriented

const numButtons = 4;
var currentScore = 0,
    highScore = 0;
var buttonElements = document.getElementsByClassName("simonsays-button");
var buttons = [];
var gameIndex = 0;
var gameArr = [];
for (var index in buttonElements) {
    if (index < numButtons) {
        buttons.push({
            "element": buttonElements[index],
            "isActive": false,
            "id": buttonElements[index].id
        });
    }
}
console.log(buttons);

function newRound(gameLength = 2) {
    gameArr = [];
    for (var i = 0; i < gameLength; i++) {
        var nextButtonIndex = Math.floor(Math.random() * numButtons);
        gameArr.push(nextButtonIndex);
    }

    newPattern(receivePattern);
}

function newPattern(callback) {
    var gameLength = gameArr.length;
    gameIndex = 0;
    var gameInterval = setInterval(() => {
        var currentButton = buttons[gameArr[gameIndex]];
        try {
            currentButton.element.classList.add("active");
        } catch (error) {}
        currentButton.isActive = true;

        setTimeout(() => {
            try {
                currentButton.element.classList.remove("active");
            } catch (error) {}
            currentButton.isActive = false;
        }, 200);

        currentButton.isActive = !currentButton.isActive;

        gameIndex++;
        if (gameIndex >= gameLength) {
            clearInterval(gameInterval);
            callback();
        }
    }, 500);
}

function updateGameScore(newScore) {
    // console.log("updating score to " + newScore);
    currentScore = newScore;
    document.getElementById("score").innerText = currentScore;
}

function addGameScore(addScore) {
    var newScore = currentScore + addScore;
    updateGameScore(newScore);
}

function clearGameScore() {
    updateGameScore(0);
}

function clickEventHandler(event) {
    var gameLength = gameArr.length;
    console.log("click", event, event.target.id);
    console.log(buttons[gameArr[gameIndex]]);
    if (event.target.id === buttons[gameArr[gameIndex]].id) {
        console.log("successful click");
        gameIndex++;
    } else {
        clearGameScore();
        document.getElementById("simonsays-game").removeEventListener("click", clickEventHandler);
        return;
    }

    if (gameIndex >= gameLength) {
        document.getElementById("simonsays-game").removeEventListener("click", clickEventHandler);
        addGameScore(1);
        setTimeout(() => {
            newRound(gameLength + 1);
        }, 1000);
    }
    return gameIndex;
}

function receivePattern(gameArr) {
    gameIndex = 0;
    document.getElementById("simonsays-game").addEventListener("click", clickEventHandler);
}

function startGame() {
    try {
        document.getElementById("simonsays-game").removeEventListener("click", clickEventHandler);
    } catch (error) { }
    clearGameScore();
    newRound();
}

document.getElementById("start-game").addEventListener("click", startGame);