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

document.addEventListener("click", function () {
  if (level <= 0) {
    nextlevel();
  }
});
