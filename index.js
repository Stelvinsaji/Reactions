// We're gonna define some consts & retrieving some HTML elements & making some variable to keep track of the current state
const clickArea = document.querySelector(".click-area");
const displayText = document.querySelector(".display-text");
const scoreElements = document.querySelectorAll(".score");

// This is gonna keep track of the score history
const scoreHistory = [];

// When it starts, it gonna take a niminum of 3sec or 3000ms for the color to change
const MINIMUN_MS_TILL_CHANGE = 3000;
const MAXIMUM_MS_TILL_CHANGE = 10000;

// It's gonna tell us how many milliseconds epoch at the time in which the color changes. This is used in calculation to find out how many milliseconds the user takes to react
let msSinceEpochOnTimeout = 0;

// When waiting for click is true, we're waiting for the user to click on the area once it has changed
let waitingForClick = false;

// We're gonna define a func called play & what it will do is it will start a new turn
function play() {
  // In here, we're gonna define how many milliseconds it will take for the color to change

  // This is gonna generate a random no. between 3000 & 10,000
  const msTillChange =
    Math.floor(
      Math.random() * (MAXIMUM_MS_TILL_CHANGE - MINIMUN_MS_TILL_CHANGE)
    ) + MINIMUN_MS_TILL_CHANGE;

  // Reverting the color back to it's original
  clickArea.style.backgroundColor = null;

  // To remove any text which displays in the center of the square
  displayText.textContent = "";

  // By calling setTimeOut() it allows us to run some code after a set amt of milliseconds.
  setTimeout(() => {
    // Date.now() is gonna give u the amt of milliseconds since Jan 1 1970. When the user click's on the square, we're gonna compare msSinceEpochOnTimeout to the current milliseconds.
    // That's how we're gonna know the gap & how much time the user has taken to click on the square
    msSinceEpochOnTimeout = Date.now();

    clickArea.style.backgroundColor = "#95bb00";
    waitingForClick = true;
  }, msTillChange);
}

// We're gonna add the score to the right side
function addScore(score) {
  // This is also defined on line 7 where we defined the array of scores
  // unshift is gonna add the score to the array. Unlike push, which adds it to the end of the array, unshift adds it to the beginning of the array.
  // So ur most recent score is always at the first index of the array or index 0.
  scoreHistory.unshift(score);

  // We're looping through every single score inside the history
  // We're gonna loop over the array up to maximum of 5 times
  for (let i = 0; i < Math.min(scoreHistory.length, 5); i++) {
    const score = scoreHistory[i];

    // We're looping through the array & grabbing the score element at the corresponding index & updating the text to be the score & then milliseconds
    scoreElements[i].textContent = `${score} ms`;
  }
}

clickArea.addEventListener("click", () => {
  if (waitingForClick) {
    // Now we're gonna measure the user's reaction time
    const score = Date.now() - msSinceEpochOnTimeout;

    waitingForClick = false;
    displayText.textContent = `The time was ${score} ms! Click to start`;

    // Once u clicked the square, wer're gonna call a func called addScore(). It's gonna take through te score which the user has received
    addScore(score);
  } else {
    play();
  }
});
