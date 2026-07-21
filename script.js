let configurationScreen = document.getElementById("configuration-screen");
let questionsScreen = document.getElementById("questions-screen");
let statisticScreen = document.getElementById("statistic-screen");

let scaleButtons = document.getElementById("scale-fieldset").querySelectorAll('input[type="radio"]');
let gameModeButtons = document.getElementById("game-mode-fieldset").querySelectorAll('input[type="radio"]');

let startRoundButton = document.getElementById("start-round-button");
let checkGuessButton = document.getElementById("check-guess-button");
let stopRoundButton = document.getElementById("stop-round-button");
let anotherRoundButton = document.getElementById("another-round-button");

let gameConfiguration = {};
let gameState = {};
let isStopButtonPressed = false;

const Notes = [
    ["C"], ["C#", "Db"], ["D"], ["D#", "Eb"], ["E"],
    ["F"], ["F#", "Gb"], ["G"], ["G#", "Ab"], ["A"], ["A#", "Bb"], ["B"]
];

function getValueFromRadioButtons(radioButtons) {
    // https://code.mu/en/javascript/book/prime/dom/form/radio/#
    for (let radio of radioButtons) {
		if (radio.checked) {
			return radio.value;
		}
	}
};

function generateQuestion() {
    // Counting from the root note
    const ScaleIntervals = {}
    ScaleIntervals["major"] = [0, 2, 4, 5, 7, 9, 11];
    ScaleIntervals["minor"] = [0, 2, 3, 5, 7, 8, 10];

    // For displaying to user scaleDegree must be incremented
    gameState["scaleDegree"] = Math.floor(Math.random() * 7);
    gameState["rootNoteIndex"] = Math.floor(Math.random() * Notes.length);
    gameState["answerNote"] = Notes[gameState["rootNoteIndex"] + gameState["scaleDegree"]];

    // Display
};

function generateRoundStatistic() {
    
};

startRoundButton.addEventListener("click", function() {
    gameConfiguration["scale"] = getValueFromRadioButtons(scaleButtons);
    gameConfiguration["gameMode"] = getValueFromRadioButtons(gameModeButtons);

    gameState["questionIndex"] = 1;
    gameState["questionsAnswered"] = 0;
    gameState["errorsMade"] = 0;

    configurationScreen.hidden = true;
    questionsScreen.hidden = false;

    generateQuestion();
});

checkGuessButton.addEventListener("click", function() {

});

stopRoundButton.addEventListener("click", function() {
    isStopButtonPressed = true;
});

anotherRoundButton.addEventListener("click", function() {
    gameConfiguration = {};
    gameState = {};

    statisticScreen.hidden = true;
    configurationScreen.hidden = false; 
})