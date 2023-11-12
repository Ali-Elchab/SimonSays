let availableColors = ["red", "green", "yellow", "blue"];
let systemSequence = [];
let userSequence = [];
let buttons = document.querySelectorAll(".btn");
let title = document.getElementById("level-title");
let level = 0;
let click = -1;

function nextlevel() {
  level++;
  title.textContent = `Level ${level}`;
  let random = Math.floor(Math.random() * 4);
  let nextColor = availableColors[random];
  systemSequence.push(nextColor);
  playsound(nextColor);
  effects(nextColor);
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
    document.body.style.cssText = "background-color:red";
    setTimeout(function () {
      document.body.style.cssText = "background-color:#011F3F";
    }, 300);
    playsound("wrong");
    setTimeout(function () {
      level = 0;
    }, 500);
  }
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (level > 0) {
      compare(button);
    }
  });
});
function playsound(color) {
  let colorAudio = new Audio(`./sounds/${color}.mp3`);
  colorAudio.play();
}

function effects(color) {
  let colorBox = document.getElementById(color);
  if (colorBox) {
    colorBox.style.transition = "opacity 0.1s";
    colorBox.style.opacity = 0;
    colorBox.style.boxShadow = "0 0 15px 10px white";

    setTimeout(function () {
      colorBox.style.opacity = 1;
      colorBox.style.boxShadow = "initial";
    }, 120);
  }
}

document.addEventListener("click", function () {
  if (level <= 0) {
    nextlevel();
  }
});
