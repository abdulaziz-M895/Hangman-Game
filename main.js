const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = letters.split("");

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);

  span.append(theLetter);
  span.classList.add("letter-box");

  lettersContainer.append(span);
});

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "java",
    "kotlin",
    "ruby",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "The Matrix",
    "Up",
    "Star Wars",
    "Fight Club",
  ],
  people: [
    "Albert Einstein",
    "Tom cruise",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
    "Elon Musk",
    "Cristiano Ronaldo",
    "Dwayne Johnson",
  ],
  countries: [
    "India",
    "Palestine",
    "China",
    "Egypt",
    "Japan",
    "Qatar",
    "Saudi Arabia",
    "Russia",
  ],
};

let allKeys = Object.keys(words);

let randomPropNum = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNum];
let randomPropValue = words[randomPropName];

let randomValueNum = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNum];

document.querySelector(".game-info span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");

let lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.classList.add("with-space");
  }
  lettersGuessContainer.append(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");

let wrongAttempts = 0;

let theDraw = document.querySelector(".hangman-draw");

function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue}`
  );
  div.append(divText);
  let again = document.createElement("p");
  again.textContent = "Reload the page to play again";
  again.classList.add("again");
  div.append(again);
  div.classList.add("pop-up-fail");
  document.body.append(div);
}

let win = [
  "Victory! Well done!",
  "Congrats! You've won!",
  "You conquered! Congrats!",
  "You're the champ! Congrats!",
  "Victory is yours!",
  "Impressive win! Congrats!",
  "Congratulations on winning!",
  "Way to go! Victory achieved!",
  "Success is yours! Congrats!",
  "Congratulations on your victory! Well played!",
];
let randomWin = Math.floor(Math.random() * win.length);

function gameWon() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`${win[randomWin]}`);
  div.append(divText);
  let errors = document.createElement("p");
  errors.textContent = `You Had ${wrongAttempts} Errors`;
  errors.classList.add("error-count");
  div.append(errors);
  let again = document.createElement("p");
  again.textContent = "Reload the page to play again";
  again.classList.add("again");
  div.append(again);
  div.classList.add("pop-up-won");
  document.body.append(div);
}

function checkGameWon() {
  let allFilled = true;
  guessSpans.forEach((span) => {
    if (span.innerHTML === "") {
      allFilled = false;
    }
  });

  if (allFilled == true) {
    gameWon();
    lettersContainer.classList.add("finished");
  }
}

document.addEventListener("click", (e) => {
  let theStatus = false;
  if (
    e.target.classList.contains("letter-box") &&
    !e.target.classList.contains("clicked")
  ) {
    e.target.classList.add("clicked");
    e.target.style.pointerEvents = "none";

    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    let theStatus = false;

    theChosenWord.forEach((wordLettr, wordIndex) => {
      if (theClickedLetter === wordLettr) {
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();
    }
    checkGameWon();
  }
});
