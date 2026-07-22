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

const ResultParagraph = document.getElementById("result-paragraph");

let gameConfiguration = {};
let gameState = {};
let isStopButtonPressed = false;
let isProcessingAnswer = false;

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

function checkElementPressenceInArray(givenElement, array) {
    for (const arrayElement of array) {
        if (arrayElement === givenElement) {
            return true;
        }
    }

    return false;
};

function getScaleDegreeInterval() {
    // Counting from the root note
    const MajorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
    const MinorScaleIntervals = [0, 2, 3, 5, 7, 8, 10];

    // Should be rewritten after adding other scales
    // Only works if all scales have the same length
    switch (gameConfiguration["scale"]) {
        case "major":
            gameState.currentQuestion.scale = "major";
            return MajorScaleIntervals[gameState.currentQuestion.scaleDegree];
            break;

        case "minor":
            gameState.currentQuestion.scale = "minor";
            return MinorScaleIntervals[gameState.currentQuestion.scaleDegree];
            break;

        case "mixed":
            if (Math.random() >= 0.5) {
                gameState.currentQuestion.scale = "major";
                return MajorScaleIntervals[gameState.currentQuestion.scaleDegree];
            } else {
                gameState.currentQuestion.scale = "minor";
                return MinorScaleIntervals[gameState.currentQuestion.scaleDegree];
            }
            break;
    
        default:
            console.error("Invalid value of 'gameConfiguration[\"scale\"]", gameConfiguration["scale"]);
            break;
    }
};

function generateQuestion() {
    // For displaying to user scaleDegree must be increased by 1
    gameState.currentQuestion.scaleDegree = Math.floor(Math.random() * 7);
    gameState.currentQuestion.rootNoteIndex = Math.floor(Math.random() * Notes.length);
    gameState.currentQuestion.answerNoteIndex = (gameState.currentQuestion.rootNoteIndex + getScaleDegreeInterval()) % 12;
    gameState.currentQuestion.attemptsLeft = gameConfiguration.maxAttempts;
};

function displayQuestion() {
    const QuestionIndexSpan = document.getElementById("question-index-span");
    const ScaleDegreeSpan = document.getElementById("scale-degree-span");
    const RootNoteSpan = document.getElementById("root-note-span");
    const ScaleSpan = document.getElementById("scale-span");

    QuestionIndexSpan.textContent = gameState.questionsAnswered + 1;
    ScaleDegreeSpan.textContent = gameState.currentQuestion.scaleDegree + 1;
    RootNoteSpan.textContent = Notes[gameState.currentQuestion.rootNoteIndex][0];
    ScaleSpan.textContent = gameState.currentQuestion.scale;

    ResultParagraph.hidden = true;
    GuessField.value = "";
};

function moveToTheNextQuestion() {
    gameState.questionsAnswered++;

    if (
        isStopButtonPressed
        || (gameConfiguration.gameMode === "errors" && gameState.errorsMade >= 5)
        || (gameConfiguration.gameMode === "questions" && gameState.questionsAnswered >= 20)
    ) {
        QuestionsScreen.hidden = true;
        StatisticScreen.hidden = false;

        // generateRoundStatistic();
        displayRoundStatistic();
    }

    gameState.currentQuestion = {};

    generateQuestion();
    displayQuestion();

    isProcessingAnswer = false;
};

function checkGuessValidity() {
    if (isProcessingAnswer) { return; }
    isProcessingAnswer = true;

    const UserAnswer = GuessField.value;

    if (checkElementPressenceInArray(UserAnswer, Notes[gameState.currentQuestion.answerNoteIndex])) {
        ResultParagraph.textContent = "Correct";
        ResultParagraph.hidden = false;

        setTimeout(moveToTheNextQuestion(), 1000);
    } else {
        gameState.currentQuestion.attemptsLeft--;

        if (gameState.currentQuestion.attemptsLeft <= 0 || gameConfiguration["maxAttempts"] === 1) {
            ResultParagraph.textContent = "That's completely wrong. The answer was" + Notes[gameState.currentQuestion.answerNoteIndex][0];
            ResultParagraph.hidden = false;
            gameState.errorsMade++;

            setTimeout(moveToTheNextQuestion(), 1000);
        }

        ResultParagraph.textContent = "Wrong answer. Attempts left: " + gameState.currentQuestion.attemptsLeft;
        ResultParagraph.hidden = false;
        GuessField.value = "";

        isProcessingAnswer = false;
    }
};

function generateRoundStatistic() {
    // This function will be used in the post-MVP stage
};

function displayRoundStatistic() {
    const RoundAmountSpan = document.getElementById("rounds-amount-span");
    const AccuracySpan = document.getElementById("accuracy-span");

    console.log(gameState);    

    RoundAmountSpan.textContent = gameState["questionsAnswered"];
    AccuracySpan.textContent = (gameState["questionsAnswered"] != 0) ? Math.floor(100 * (1 - gameState["errorsMade"] / gameState["questionsAnswered"])) : 0;
};

StartRoundButton.addEventListener("click", function() {
    gameConfiguration["scale"] = getValueFromRadioButtons(ScaleButtons);
    gameConfiguration["gameMode"] = getValueFromRadioButtons(GameModeButtons);
    gameConfiguration["maxAttempts"] = 2;

    gameState["questionsAnswered"] = 0;
    gameState["errorsMade"] = 0;
    gameState.currentQuestion = {};

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