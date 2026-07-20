let configurationScreen = document.getElementById("configuration-screen");
let questionsScreen = document.getElementById("questions-screen");
let statisticScreen = document.getElementById("statistic-screen");

let startRoundButton = document.getElementById("start-round-button");

let gameConfiguration = {};
let gameState = {};

const Notes = [
    ["C"], ["C#", "Db"], ["D"], ["D#", "Eb"], ["E"],
    ["F"], ["F#", "Gb"], ["G"], ["G#", "Ab"], ["A"], ["A#", "Bb"], ["B"]
];

// Counting from the root note
const MajorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
const MinorScaleIntervals = [0, 2, 3, 5, 7, 8, 10];

function getValueFromRadioButtons(radioButtons) {
    // https://code.mu/en/javascript/book/prime/dom/form/radio/#
    for (let radio of radioButtons) {
		if (radio.checked) {
			return radio.value;
		}
	}
};

function getLoopCondition() {
    switch (gameConfiguration["gameMode"]) {
        case "questions":
            return function() {
                return gameState["questionsAnswered"] <= 20;
            };
            break;

        case "errors":
            return function() {
                return gameState["errorsMade"] <= 5;
            };
            break;

        case "tired":
            return function() {
                return true;
            };
            break;
    
        default:
            console.error("gameMode's value isn't valid", gameConfiguration["gameMode"]);
            break;
    }
};

startRoundButton.addEventListener("click", function () {
    let scaleButtons = document.getElementById("scale-fieldset").querySelectorAll('input[type="radio"]');
    gameConfiguration["scale"] = getValueFromRadioButtons(scaleButtons);

    let gameModeButtons = document.getElementById("game-mode-fieldset").querySelectorAll('input[type="radio"]');
    gameConfiguration["gameMode"] = getValueFromRadioButtons(gameModeButtons);

    configurationScreen.hidden = true;
    questionsScreen.hidden = false;

    let checkLoopCondition = getLoopCondition();

    while (checkLoopCondition()) {
        // ...
    }
});