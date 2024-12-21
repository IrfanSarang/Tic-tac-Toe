const boxes = document.querySelectorAll(".box");
const reset = document.getElementById("reset");
const msg = document.querySelector('#msg');
const showWinnerDiv = document.getElementById("showWinner");
const newGame = document.getElementById('newGame');

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let turnX = true;
let win = null;
let gameEnded = false;

const checkWinner = () => {
    for (const pattern of winPatterns) {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if (posVal1 !== "" && posVal1 === posVal2 && posVal1 === posVal3) {
            win = posVal1;
            showWinner();
            return;
        }
    }

    if (![...boxes].some(box => box.innerText === "") && !win) {
        showDraw();
    }
}

const showWinner = () => {
    msg.innerText = `Winner is ${win}`;
    showWinnerDiv.style.display = "flex";
    gameEnded = true;
}

const showDraw = () => {
    msg.innerText = "It's a Draw!!";
    showWinnerDiv.style.display = "flex";
    gameEnded = true;
}

newGame.addEventListener('click', () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    showWinnerDiv.style.display = "none";
    turnX = true;
    win = null;
    gameEnded = false;
});

reset.addEventListener('click', () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    showWinnerDiv.style.display = "none";
    turnX = true;
    win = null;
    gameEnded = false;
});

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText !== "" || gameEnded) return;

        if (turnX) {
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;

        checkWinner();
    });
});
