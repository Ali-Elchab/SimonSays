let availableColors = ["red", "green", "yellow", "blue"];
let systemSequence = [];
let userSequence = [];
let buttons = document.querySelectorAll(".btn");
let title = document.getElementById("level-title");
let highScoreText = document.querySelector("#high-score");
let newHighScoreValue = document.getElementById("newHighScoreValue");
let container = document.querySelector(".container");
let level = 0;
let highscore = 0;
let click = -1;
let systemPlaying = false;

function nextlevel() {
  systemPlaying = true;
  level++;
  title.textContent = `Level ${level}`;
  let random = Math.floor(Math.random() * 4);
  let nextColor = availableColors[random];
  systemSequence.push(nextColor);
  playsound(nextColor);
  effects(nextColor);
  setTimeout(function () {
    systemPlaying = false;
  }, 100);
}

function compare(button) {
  click++;
  playsound(button.id);
  effects(button.id);
  userSequence.push(button.id);
  let buttonID = String(button.id).toLowerCase();
  if (buttonID == systemSequence[click]) {
    if (userSequence.length == systemSequence.length) {
      setTimeout(function () {
        userSequence = [];
        nextlevel();
        click = -1;
      }, 500);
    }
  } else {
    title.textContent = "Game Over, press anywhere to start again";
    click = -1;
    userSequence = [];
    systemSequence = [];
    document.body.classList.add("game-over");
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 300);
    playsound("wrong");
    if (level > highscore) {
      highscore = level;
      highScoreText.innerText = `${highscore}`;
      newHighScoreValue.innerText = `${highscore}`;
      setTimeout(function () {
        newHighScoreSection.style.display = "block";
        container.style.display = "none";
      }, 700);
      setTimeout(function () {
        newHighScoreSection.style.display = "none";
        container.style.display = "block";
      }, 2500);
    }
    setTimeout(function () {
      level = 0;
    }, 500);
  }
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (level > 0 && systemPlaying == false) {
      compare(button);
    }
  });
});
function playsound(color) {
  let colorAudio = new Audio(`./Assets/sounds/${color}.mp3`);
  colorAudio.play();
}

function effects(color) {
  let colorBox = document.getElementById(color);
  if (colorBox) {
    colorBox.classList.add("pressed");
    setTimeout(function () {
      colorBox.classList.remove("pressed");
    }, 120);
  }
}

window.addEventListener("keydown", function () {
  if (level <= 0) {
    nextlevel();
  }
});
