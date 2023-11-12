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
