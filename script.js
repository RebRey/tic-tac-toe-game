//#6 Create x and circle class variables and give them a string value that can be used later
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
// #23 create an array named WINNING_COMBINATIONS and store all of the winning combinations for each cell
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// #1 Select all of the cells and store them in a variable called cellElements
const cellElements = document.querySelectorAll("[data-cell]");
// #16 Select the board by using it's html ID and store them in a variable called board
const board = document.getElementById("board");

// #37 Select the winningMessage ID and store it in a variable called winningMessageElement
const winningMessageElement = document.getElementById("winningMessage");

// #43 select the restartButton ID and store it in a variable called restartButton
const restartButton = document.getElementById("restartButton");

// #36 create a variable that stores the winning message
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

//#5 create a variable called circleTurn
// variable will be used to determine if circleTurn is true then it is circle's turn
// if circleTurn is false then it is x's turn.
let circleTurn;

// #22 call the start game function
startGame();

// #44 add a click event listener to the restartButton and call the startGame function
restartButton.addEventListener("click", startGame);

// #21 create a function that starts the game and let x star the game (set circleTurn to false)
function startGame() {
  circleTurn = false;
  // #2 Loop through each cell element
  cellElements.forEach((cell) => {
    // #46 remove the x class to clear the board when a game starts
    cell.classList.remove(X_CLASS);

    // #47 remove the circle  class class to clear the board when a game starts
    cell.classList.remove(CIRCLE_CLASS);
    // #48 remove the event listener for the click and remove the handleClick function
    cell.removeEventListener("click", handleClick);
    // #3 add an event listener for a click, start the handleClick function only once
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  // #45 Remove the show class so that it removes the winning message
  winningMessageElement.classList.remove("show");
}

// #4 Create a function that handles mouse click events
function handleClick(e) {
  // #7 the cell will be the target (whatever we clicked on)
  const cell = e.target;
  // #8 create a variable that can store the current class
  // If it is circle's turn then we want to return the circle class
  // otherwise return the x class
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // #10 call the placeMark function and pass in the cell and currentClass value
  placeMark(cell, currentClass);
  // #24 check for a win by passing in the current class
  if (checkWin(currentClass)) {
    // #29 call the endGame function and pass it false
    endGame(false);
    // #42 Otherwise if there is a draw then end the game
  } else if (isDraw()) {
    endGame(true);
  } else {
    // #13 call the swapTurns function to swap turns
    swapTurns();
    // #15 call the BoardHoverClass function to apply the hover effect
    setBoardHoverClass();
  }
}
// #28 create a function called endGame and pass in a draw
function endGame(draw) {
  // #30 If it is a draw then display the draw message
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
    // #31 Otherwise if it is not a draw then select the winning message text
  } else {
    // #38 set the inner text to be equal to a string by checking to see whose turn it is
    // if it's circle's turn then display innerText to O's wins
    // if it's x's turn then display innerText to X's wins
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  // #38 Add the show class by selecting the winning message element
  winningMessageElement.classList.add("show");
}

// #39 create the isDraw function
function isDraw() {
  // #40 Loop thorough each cell to make sure that every single cell has been filled
  // the cellElements does not have an every method so it will need to be destructure the cell
  // into an array [..variableName].every to apply the every method
  return [...cellElements].every((cell) => {
    // #41 check if every cell has an x class or circle class
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
// #9 Create a function that places an x or circle
function placeMark(cell, currentClass) {
  // #11 Add the current class to the cell that is clicked on
  cell.classList.add(currentClass);
}

// #12 Create a function that switches turns between x and circle
function swapTurns() {
  circleTurn = !circleTurn;
}

// #14 Create a function that determines which class to apply
function setBoardHoverClass() {
  // #17 Remove the X class
  board.classList.remove(X_CLASS);
  // #18 Remove the circle class
  board.classList.remove(CIRCLE_CLASS);
  // #19 if it is circle's turn then add the circle class
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
    // #20 Otherwise add the x class
  } else {
    board.classList.add(X_CLASS);
  }
}

// #25 create a checkWin function and pass in the current class to check all
// of the winning combinations to see if some of the winning combinations are
// met by the current combinations
function checkWin(currentClass) {
  // #26 this will return true if any of the values inside of it are true and
  // loop through all of the combinations
  return WINNING_COMBINATIONS.some((combination) => {
    // #27 for each one of the combinations check if all of the indexes (if all of the values
    // in a cell element have the same class)
    return combination.every((index) => {
      // #28 check which cell and check the class list to see if it contains the
      // current class.
      // If the current class is in all three of these elements inside of the combination
      // then it is a winner
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
