const padSize = [4, 3];
const cardId = [
  "card-a",
  "card-b",
  "card-c",
  "card-d",
  "card-e",
  "card-f",
  "card-a",
  "card-b",
  "card-c",
  "card-d",
  "card-e",
  "card-f",
];
// create grid

const gamePad = document.querySelector(".game-grid");

const status = {
  firstCard: "",
  secondCard: "",
  flipped: 0,
  success: 0,
  failure: 0,
};

//Array Shuffle function-----------------------------------

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue = 0;
  let randomIndex = 0;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//initialize the gamepad-----------------------------------------

function initCards() {
  let pad = [];
  const shuffledCards = shuffle(cardId);
  for (let i = 0; i < padSize[0] * padSize[1]; i++) {
    const card = document.createElement("div");
    card.className = `card ${shuffledCards[i]} flipped`;
    card.id = `card-${i}`;
    gamePad.appendChild(card);
    pad.push(card);
  }
}

// event listener function----------------------------------------

function chooseCard(event) {
  updateFlipped(event.target);
  if (status.flipped === 2 && event.target.className.includes("card")) {
    if (status.firstCard.className === status.secondCard.className) {
      status.success += 1;
      success.textContent = `Success: ${status.success}`;
    } else {
      status.failure += 1;
      failure.textContent = `Failure: ${status.failure}`;
      setTimeout(function () {
        status.firstCard.classList.add("flipped");
        status.secondCard.classList.add("flipped");
      }, 1000);
    }
    status.flipped = 0;
  }
  console.log(status);
  document.querySelector("#message").textContent = "You won!";
  document.querySelector("#message").classList.add("green");
  document.querySelector("#play").textContent = "New Game";
  endOverlay();
}
// win overlay---------------------------------------------------

function endOverlay() {
  if (status.success === 6 || flag === 1) {
    clearInterval(countdown);
    const cover = document.querySelector("#cover");
    const message = document.querySelector("#message");
    const play = document.querySelector("#play");
    cover.classList.remove("hidden");
    message.classList.remove("hidden");
    play.classList.remove("hidden");
    flag = 0;
  }
}
// update flipped status function-------------------------------
function updateFlipped(event) {
  status.roundClicked = [];
  if (status.flipped === 0 && event.className.includes("flipped")) {
    status.flipped = 1;
    status.firstCard = event;
  } else if (status.flipped === 1 && event.className.includes("flipped")) {
    status.flipped = 2;
    status.secondCard = event;
    gamePad.removeEventListener("click", chooseCard);
    setTimeout(function () {
      gamePad.addEventListener("click", chooseCard);
    }, 1200);
  }
  event.classList.remove("flipped");
}

//remove win cover---------------------------------------------

function removeWinCover() {
  const cover = document.querySelector("#cover");
  const message = document.querySelector("#message");
  const play = document.querySelector("#play");
  cover.classList.add("hidden");
  message.classList.add("hidden");
  play.classList.add("hidden");
}
// start game-------------------------------------------------
function startGame() {
  status.failure = 0;
  failure.textContent = `Failure: ${status.failure}`;
  status.success = 0;
  success.textContent = `Success: ${status.success}`;
  status.flipped = 0;
  gamePad.innerHTML = "";
  removeWinCover();
  initCards();
  initTimer();
}

//timer-------------------------------------------------------
let countdown;
let flag = 0;
function initTimer() {
  let sec = 59;
  countdown = setInterval(function () {
    document.querySelector(".timer").innerHTML = `00:${sec}`;
    sec--;
    if (sec < 0) {
      clearInterval(countdown);
      flag = 1;
      document.querySelector("#message").textContent = "Game Over!";
      document.querySelector("#message").classList.add("red");
      document.querySelector("#play").textContent = "New Game";
      endOverlay();
    }
  }, 1000);
}
//start page overlay ------------------------------------------
function startOverlay() {
  clearInterval(countdown);
  const cover = document.querySelector("#cover");
  const message = document.querySelector("#message");
  message.classList.add("blue");
  const play = document.querySelector("#play");
  cover.classList.remove("hidden");
  message.classList.remove("hidden");
  play.classList.remove("hidden");
}
//! load------------------------------------------------------

initCards();
initTimer();
startOverlay();
//!Event listeners--------------------------------------------

let success = document.querySelector(".success");
let failure = document.querySelector(".failure");
const play = document.querySelector("#play");

gamePad.addEventListener("click", chooseCard);
play.addEventListener("click", startGame);
