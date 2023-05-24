var gameSequence = [];
var userButtonSequence = [];
var level = 0;
var gameStarted = false;

function nextSequence() {
  const buttonColors = ["red", "blue", "green", "yellow"];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gameSequence.push(randomChosenColor);
  playSound(randomChosenColor);
  $(`#${gameSequence.slice(-1)}`).fadeOut(100);
  $(`#${gameSequence.slice(-1)}`).fadeIn(100);
  level++;
  gameStarted = true;
  $("h1").text(`Level ${level}`);
}

function playSound(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

$(document).ready(function () {
  $(".btn").click(function () {
    userChosenColor = this.id;
    userButtonSequence.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userButtonSequence.length - 1);
    playSound(userChosenColor);
  });
});

$(document).on("keypress", () => {
  startGame();
});

$("h1").on("click", () => {
  startGame();
});

function checkAnswer(indexOfLastAnswer) {
  if (
    gameSequence[indexOfLastAnswer] !== userButtonSequence[indexOfLastAnswer]
  ) {
    var failAudio = new Audio("./sounds/wrong.mp3");
    $("h1").text("Game Over, Press Any Key to Restart");
    failAudio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

  if ((indexOfLastAnswer === level - 1) & gameStarted) {
    setTimeout(nextSequence, 1000);
    userButtonSequence = [];
  }
}

function startOver() {
  gameStarted = false;
  userButtonSequence = [];
  gameSequence = [];
  level = 0;
}

function startGame() {
  if (!gameStarted) {
    nextSequence();
  }
}
