const ConfigurationScreen = document.getElementById("configuration-screen");
const QuestionsScreen = document.getElementById("questions-screen");
const StatisticScreen = document.getElementById("statistic-screen");

const ScaleButtons = document.getElementById("scale-fieldset").querySelectorAll('input[type="radio"]');
const GameModeButtons = document.getElementById("game-mode-fieldset").querySelectorAll('input[type="radio"]');

const StartRoundButton = document.getElementById("start-round-button");
const CheckGuessButton = document.getElementById("check-guess-button");
const StopRoundButton = document.getElementById("stop-round-button");
const AnotherRoundButton = document.getElementById("another-round-button");

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
};

function displayQuestion() {

};

function generateRoundStatistic() {
    
};

function displayRoundStatistic() {

};

StartRoundButton.addEventListener("click", function() {
    gameConfiguration["scale"] = getValueFromRadioButtons(ScaleButtons);
    gameConfiguration["gameMode"] = getValueFromRadioButtons(GameModeButtons);

    gameState["questionIndex"] = 1;
    gameState["questionsAnswered"] = 0;
    gameState["errorsMade"] = 0;

    ConfigurationScreen.hidden = true;
    QuestionsScreen.hidden = false;

    generateQuestion();
});

CheckGuessButton.addEventListener("click", function() {

});

StopRoundButton.addEventListener("click", function() {
    isStopButtonPressed = true;
});

AnotherRoundButton.addEventListener("click", function() {
    gameConfiguration = {};
    gameState = {};

    StatisticScreen.hidden = true;
    ConfigurationScreen.hidden = false; 
})