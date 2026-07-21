const ConfigurationScreen = document.getElementById("configuration-screen");
const QuestionsScreen = document.getElementById("questions-screen");
const StatisticScreen = document.getElementById("statistic-screen");

const ScaleButtons = document.getElementById("scale-fieldset").querySelectorAll('input[type="radio"]');
const GameModeButtons = document.getElementById("game-mode-fieldset").querySelectorAll('input[type="radio"]');
const GuessField = document.getElementById("guess-field");

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

function getScaleDegreeInterval() {
    // Counting from the root note
    const MajorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
    const MinorScaleIntervals = [0, 2, 3, 5, 7, 8, 10];

    // Should be rewritten after adding other scales
    // Only works if all scales have the same length
    switch (gameConfiguration["scale"]) {
        case "major":
            gameState["currentScale"] = "major";
            return MajorScaleIntervals[gameState["scaleDegree"]];
            break;

        case "minor":
            gameState["currentScale"] = "minor";
            return MinorScaleIntervals[gameState["scaleDegree"]];
            break;

        case "mixed":
            if (Math.random() >= 0.5) {
                gameState["currentScale"] = "major";
                return MajorScaleIntervals[gameState["scaleDegree"]];
            } else {
                gameState["currentScale"] = "minor";
                return MinorScaleIntervals[gameState["scaleDegree"]];
            }
            break;
    
        default:
            console.error("Invalid value of 'gameConfiguration[\"scale\"]", gameConfiguration["scale"]);
            break;
    }
};

function generateQuestion() {
    // For displaying to user scaleDegree must be incremented
    gameState["scaleDegree"] = Math.floor(Math.random() * 7);
    gameState["rootNoteIndex"] = Math.floor(Math.random() * Notes.length);
    gameState["answerNoteIndex"] = (gameState["rootNoteIndex"] + getScaleDegreeInterval()) % 12;
    ++gameState["questionIndex"];
};

function displayQuestion() {
    const QuestionIndexSpan = document.getElementById("question-index-span");
    const ScaleDegreeSpan = document.getElementById("scale-degree-span");
    const RootNoteSpan = document.getElementById("root-note-span");
    const ScaleSpan = document.getElementById("scale-span");

    QuestionIndexSpan.textContent = gameState["questionIndex"];
    ScaleDegreeSpan.textContent = ++gameState["scaleDegree"];
    RootNoteSpan.textContent = Notes[gameState["rootNoteIndex"]][0];
    ScaleSpan.textContent = gameState["currentScale"];
};

function checkGuessValidity() {
    
};

function generateRoundStatistic() {
    // This function will be used in the post-MVP stage
};

function displayRoundStatistic() {
    const RoundAmountSpan = document.getElementById("rounds-amount-span");
    const AccuracySpan = document.getElementById("accuracy-span");

    RoundAmountSpan.textContent = gameState["questionsAnswered"];
    AccuracySpan.textContent = (gameState["questionsAnswered"] != 0) ? Math.floor(100 * (1 - gameState["errorsMade"] / gameState["questionsAnswered"])) : 0;
};

StartRoundButton.addEventListener("click", function() {
    gameConfiguration["scale"] = getValueFromRadioButtons(ScaleButtons);
    gameConfiguration["gameMode"] = getValueFromRadioButtons(GameModeButtons);

    // Perhaps, 'questionIndex' and 'questionsAnswered' are duplicates
    gameState["questionIndex"] = 0;
    gameState["questionsAnswered"] = 0;
    gameState["errorsMade"] = 0;

    ConfigurationScreen.hidden = true;
    QuestionsScreen.hidden = false;

    generateQuestion();
    displayQuestion();
});

CheckGuessButton.addEventListener("click", checkGuessValidity);

GuessField.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !QuestionsScreen.hidden) {     
        checkGuessValidity();
    }
});

StopRoundButton.addEventListener("click", function() {
    isStopButtonPressed = true;
});

AnotherRoundButton.addEventListener("click", function() {
    gameConfiguration = {};
    gameState = {};
    isStopButtonPressed = false;

    StatisticScreen.hidden = true;
    ConfigurationScreen.hidden = false; 
})