function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const allPieces = document.querySelectorAll(".piece");
const containerGameResult = document.querySelector(".container-game-result");
let orderPossibilities = [];
let hidePiecesRemain;
let firstChoice = {
  element: "",
  img: "",
};
let secondChoice = {
  element: "",
  img: "",
};

function flipPiece() {
  for (const piece of allPieces) {
    piece.addEventListener("click", () => {
      piece.classList.toggle("flip");
    });
  }
}
flipPiece();

function displayRandomPieces() {
  for (let i = 1; i <= allPieces.length; i++) {
    orderPossibilities.push(`${i}`);
  }
  for (const piece of allPieces) {
    const selectedNum = getRandomInt(0, orderPossibilities.length);

    piece.style.order = orderPossibilities.at(selectedNum);
    orderPossibilities.splice(selectedNum, 1);
  }
}
displayRandomPieces();

function selectPiece() {
  for (const piece of allPieces) {
    piece.addEventListener("click", () => {
      if (secondChoice.element != "") {
        if (firstChoice.img != secondChoice.img) {
          firstChoice.element.style.pointerEvents = null;
          secondChoice.element.style.pointerEvents = null;
          firstChoice.element.classList.remove("flip");
          secondChoice.element.classList.remove("flip");

          firstChoice.element = "";
          secondChoice.element = "";
          firstChoice.img = "";
          secondChoice.img = "";
        }
      }
      if (firstChoice.element == "") {
        firstChoice.element = piece;
        firstChoice.img = piece.querySelector(".hide img").getAttribute("src");
        piece.style.pointerEvents = "none";
      } else {
        secondChoice.element = piece;
        secondChoice.img = piece.querySelector(".hide img").getAttribute("src");
        piece.style.pointerEvents = "none";
      }

      if (secondChoice.element != "") {
        if (firstChoice.img == secondChoice.img) {
          firstChoice.element.style.pointerEvents = "none";
          secondChoice.element.style.pointerEvents = "none";
          firstChoice.element = "";
          secondChoice.element = "";
          firstChoice.img = "";
          secondChoice.img = "";
        }
      }

      showGameResult();
    });
  }
}
selectPiece();

function detectRemainPieces() {
  hidePiecesRemain = 0;
  for (const piece of allPieces) {
    if (piece.className == "piece") {
      hidePiecesRemain += 1;
    }
  }
}

function showGameResult() {
  detectRemainPieces();
  if (hidePiecesRemain == 0) {
    containerGameResult.classList.add("show");
  }
}

function newGame() {
  const newGameBtn = document.querySelector(".game-result button");
  newGameBtn.addEventListener("click", () => {
    containerGameResult.classList.remove("show");

    for (const piece of allPieces) {
      piece.className = "piece";
    }

    setTimeout(() => {
      for (const piece of allPieces) {
        piece.style.pointerEvents = null;
      }
      displayRandomPieces();
    }, 1500);
  });
}
newGame();
