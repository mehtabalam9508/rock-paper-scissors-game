// ================================
// ROCK PAPER SCISSORS GAME
// ================================

// Get HTML Elements
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");

const resultText = document.getElementById("result-text");

const playerChoiceElement = document.getElementById("player-choice");
const computerChoiceElement = document.getElementById("computer-choice");

const restartButton = document.getElementById("restart-btn");


// Score
let playerScore = 0;
let computerScore = 0;


// Available Choices
const choices = ["Rock", "Paper", "Scissors"];


// ================================
// COMPUTER CHOICE
// ================================

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}


// ================================
// SOUND EFFECT
// ================================

function playSound(type) {

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === "win") {
        oscillator.frequency.value = 600;
    } 
    else if (type === "lose") {
        oscillator.frequency.value = 200;
    } 
    else {
        oscillator.frequency.value = 400;
    }

    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.3
    );

    oscillator.start();

    oscillator.stop(audioContext.currentTime + 0.3);
}


// ================================
// REMOVE ANIMATIONS
// ================================

function removeAnimations() {

    resultText.classList.remove("result-animation");

    playerChoiceElement.classList.remove("move-animation");

    computerChoiceElement.classList.remove("move-animation");

    document.querySelector(".game-container")
        .classList.remove("win-effect", "lose-effect");
}


// ================================
// PLAY GAME
// ================================

function playGame(playerChoice) {

    removeAnimations();

    // Get Computer Choice
    const computerChoice = getComputerChoice();


    // Show Choices
    playerChoiceElement.textContent = playerChoice;
    computerChoiceElement.textContent = computerChoice;


    // Add Choice Animation
    void playerChoiceElement.offsetWidth;
    void computerChoiceElement.offsetWidth;

    playerChoiceElement.classList.add("move-animation");
    computerChoiceElement.classList.add("move-animation");


    // Result
    if (playerChoice === computerChoice) {

        resultText.textContent = "It's a Draw! 🤝";

        playSound("draw");

    }

    else if (
        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Paper" && computerChoice === "Rock") ||
        (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {

        // Player Wins
        playerScore++;

        playerScoreElement.textContent = playerScore;

        resultText.textContent = "You Win! 🎉";

        document
            .querySelector(".game-container")
            .classList.add("win-effect");

        playSound("win");

    }

    else {

        // Computer Wins
        computerScore++;

        computerScoreElement.textContent = computerScore;

        resultText.textContent = "Computer Wins! 🤖";

        document
            .querySelector(".game-container")
            .classList.add("lose-effect");

        playSound("lose");
    }


    // Result Animation
    void resultText.offsetWidth;
    resultText.classList.add("result-animation");
}


// ================================
// BUTTON EVENTS
// ================================

rockButton.addEventListener("click", function () {

    playGame("Rock");

});


paperButton.addEventListener("click", function () {

    playGame("Paper");

});


scissorsButton.addEventListener("click", function () {

    playGame("Scissors");

});


// ================================
// RESTART GAME
// ================================

restartButton.addEventListener("click", function () {

    // Reset Score
    playerScore = 0;
    computerScore = 0;


    // Reset Score Display
    playerScoreElement.textContent = "0";
    computerScoreElement.textContent = "0";


    // Reset Choices
    playerChoiceElement.textContent = "-";
    computerChoiceElement.textContent = "-";


    // Reset Result
    resultText.textContent = "Make Your Move!";


    // Remove Animations
    removeAnimations();

});