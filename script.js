"use strict";
/// select number range:
document // this will run when we click on the button select
  .querySelector(".retriever1")
  .addEventListener("click", updateParagraph);
document
  .querySelector(".retriever2")
  .addEventListener("click", updateParagraph);

let startNumber; // these will be replaced by the values from the updateParagraph function
let endNumber;
let randomNum;

function updateParagraph() {
  startNumber = Number(document.querySelector(".number-range").value);
  endNumber = Number(document.querySelector(".number-range2").value);
  const paragraph = document.querySelector("p");

  if (startNumber && endNumber) {
    paragraph.textContent = `Number between ${startNumber} and ${endNumber}.`;
  } else if (startNumber) {
    paragraph.textContent = `Number between ${startNumber} and (choose the number).`;
  } else if (endNumber) {
    paragraph.textContent = `Number between (choose the number) and ${endNumber}.`;
  } else {
    paragraph.textContent =
      "Number between (choose the number) and (choose the number).";
  }
}

// Select the number of attempts:

let attemptsNumberFixed; // this one will be fixed so that when we reset, it resets too

let attemptsNumber;
document
  .querySelector(".retriever3")
  .addEventListener("click", addNumberOfAttempts);

function addNumberOfAttempts() {
  attemptsNumberFixed = document.querySelector(".attempts").value;
  document.querySelector(".score").textContent = attemptsNumberFixed;
  attemptsNumber = attemptsNumberFixed; // we will be working with this (this one is the one that will get decreased)
}

// create a function for the .message so we won't be repeating it a lot
function displayMessage(content) {
  return (document.querySelector(".message").textContent = content);
}

function guessingGame() {
  document.querySelector(".check").addEventListener("click", eventHandler);

  function eventHandler() {
    const guess = Number(document.querySelector(".guess").value);

    if (!guess) {
      // this means if guess is 0 (because 0 is a falsy value)
      displayMessage("No number!");
    } else {
      if (guess === randomNum) {
        document.querySelector(".number").textContent = guess;
        document.querySelector(".number").style.width = "30rem";
        document.querySelector("body").style.backgroundColor = "green";
        displayMessage("Congratulations!");
        attemptsNumber = attemptsNumberFixed; // resets the previous attempts number
        document
          .querySelector(".check")
          .removeEventListener("click", eventHandler); // we disable the event Listener when the user wins
        document.querySelector(".check").classList.add("not-allowed"); // we change the style of the cursor when the user wins
      } else {
        {
          guess > randomNum
            ? displayMessage("Lower")
            : displayMessage("Higher");
        }
        if (attemptsNumber === 1) {
          // here when the score is 1, the user clicks one last time and if he doesn't get it, it's lost
          attemptsNumber--;
          displayMessage("You Lost.");
          document
            .querySelector(".check")
            .removeEventListener("click", eventHandler); // we disable the event Listener when the user loses
          attemptsNumber = attemptsNumberFixed; // resets the old previous value of attempts
          document.querySelector(".check").classList.add("not-allowed"); // we change the style of the cursor when the user loses
          document.querySelector(".score").textContent = 0; // here I will hard code it because the number of attempts is always 0 when we lose
          document.querySelector("body").style.backgroundColor = "red";
        } else {
          // here the score isn't 1 and the the game will just continue
          attemptsNumber--;
          document.querySelector(".score").textContent = attemptsNumber;
        }
      }
    }
  }
}

document.querySelector(".play").addEventListener("click", function () {
  if (startNumber && endNumber && attemptsNumber) {
    randomNum = Math.floor(
      Math.random() * (endNumber - startNumber + 1) + startNumber
    );
    // the game starts when both values are filled
    document.querySelector(".check").classList.remove("not-allowed"); // we remove the style of not being able to click
    document.querySelector(".play").textContent = "Play Again!";
    // play and again are the same button
    randomNum = Math.floor(
      Math.random() * (endNumber - startNumber + 1) + startNumber
    ); // this will generate a number between the two values entered and those values are inculsive

    // we reset everything in the page
    displayMessage("Start guessing...");
    document.querySelector(".number").textContent = "?";
    document.querySelector(".number").style.width = "15rem";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".score").textContent = attemptsNumber;
    document.querySelector(".guess").value = "";

    // call the game
    guessingGame();
  }
});

////
