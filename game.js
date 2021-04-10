let started = false;
let soundVolume = 0.1;
let colors = ["green", "red", "yellow", "blue"];
let gamePattern;
let pos;

$(document).keypress(() => {
  if (!started) {
    gamePattern = [];
    pos = 0;
    started = true;
    nextSequence();
  }
});

$(document).keypress((event) => {
  if (event.key === 'c') {
    $("#hint").toggleClass("hidden");
  }
});

$(".btn").click(checkColor);

function nextSequence() {
  if (!started) return;

  let color = randomColor();
  let button = $("#" + color);
  gamePattern.push(color);
  button.fadeOut(200).fadeIn(200);
  playButtonSound(button);
  setTitle("Level " + gamePattern.length);

  $("#hint").append("<div class=\"btn-hint " + color + "\"></div>");
}

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function checkColor() {
  if (!started) return;

  animateButton($(this));
  playButtonSound($(this));

  if ($(this).attr("id") === gamePattern[pos]) {
    pos++;
  } else {
    endGame();
  }

  if (pos === gamePattern.length) {
    pos = 0;
    setTimeout(() => {
      nextSequence();
    }, 700);
  }
}

function animateButton(button) {
  button.addClass("pressed");
  setTimeout(() => button.removeClass("pressed"), 100);
}

function playButtonSound(button) {
  let soundFile;
  let id = button.attr("id");

  switch (id) {
    case "green":
      soundFile = "green.mp3";
      break;
    case "red":
      soundFile = "red.mp3";
      break;
    case "yellow":
      soundFile = "yellow.mp3";
      break;
    case "blue":
      soundFile = "blue.mp3";
      break;
  }

  let audio = new Audio("sounds/" + soundFile);
  audio.volume = soundVolume;
  audio.play();
}

function endGame() {
  let audio = new Audio("sounds/wrong.mp3");
  audio.volume = soundVolume;
  audio.play();

  $("body").addClass("game-over");
  setTimeout(() => $("body").removeClass("game-over"), 200);
  setTitle("Game Over, Press Any Key to Restart");
  $("div.btn-hint").remove();
  started = false;
}

function setTitle(title) {
  $("#level-title").html(title);
}
