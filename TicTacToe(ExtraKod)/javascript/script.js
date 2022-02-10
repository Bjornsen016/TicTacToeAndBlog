import { Game } from "./logic.js";
/* import {} from "./utils.js"; */

const game = new Game();

const squares = document.querySelectorAll("div.square");
const playerOneName = document.getElementById("playerOneName");
const playerTwoName = document.getElementById("playerTwoName");
const playerOneScore = document.getElementById("playerOneScore");
const playerTwoScore = document.getElementById("playerTwoScore");
const turnIndicator = document.getElementById("turn-indicator");
const modal = document.getElementById("winOrDrawModal");
const winOrDrawText = document.getElementById("winOrDrawText");
const close = document.getElementsByClassName("close")[0];
const playerOneSymbol = "X";
const playerTwoSymbol = "O";
const toggleBot = document.getElementById("toggleBotBtn");
let botPlaying = false;
/**
 * Initializes the board.
 * Gives all the squares an onclick that makes moves for current player.
 * Makes the names editable.
 * Makes the winOrDrawModal closeable by clicking outside it.
 * Prints the scoreboard, names and whos turn it is.
 */
function init() {
	squares.forEach((square, index) =>
		square.addEventListener("click", () => {
			playerPlays(index);
		})
	);

	//Adds an eventlistener on click for editing the players names.
	window.addEventListener("click", function (event) {
		if (!event.target.hasAttribute("data-editable")) return;
		if (event.detail != 2) return;

		event.target.setAttribute("contenteditable", true);

		const turnEditableOffHandler = () => {
			event.target.removeAttribute("contenteditable");
			event.target.removeEventListener("blur", turnEditableOffHandler);

			if (event.target == playerOneName)
				game.playerOne.name = playerOneName.innerText;
			else if (event.target == playerTwoName)
				game.playerTwo.name = playerTwoName.innerText;

			turnIndicator.innerText = `${game.currentPlayer.name}'s turn`;
			game.saveToLocalStorage();
		};
		event.target.addEventListener("blur", turnEditableOffHandler);
	});
	window.addEventListener("click", function (event) {
		if (event.target != modal) return;
		modal.style.display = "none";
		resetBoard();
	});
	window.addEventListener("click", function (event) {
		if (event.target != toggleBot) return;
		toggleBotPlay();
	});

	printScoreBoard();
}

function playerPlays(gridSpot) {
	let player = game.currentPlayer;
	let hasWon = game.play(gridSpot);
	paintBoard();
	if (hasWon === false) return;

	if (hasWon) {
		winShow(player, false);
		updateScore();
		return;
	} else if (game.checkDraw()) {
		winShow(game.currentPlayer, true);
		return;
	}
	//Bot spel
	if (!botPlaying) return;

	setTimeout(function () {
		let botHasWon = game.botMove();
		if (botHasWon) {
			winShow(game.playerTwo, false);
			updateScore();
			return;
		} else if (game.checkDraw()) {
			winShow(game.currentPlayer, true);
			return;
		}
		paintBoard();
	}, 1000);
}

function paintBoard() {
	squares.forEach(function (square, index) {
		if (game.playerOne.markedSpots.includes(index)) {
			square.innerText = playerOneSymbol;
		}
		if (game.playerTwo.markedSpots.includes(index)) {
			square.innerText = playerTwoSymbol;
		}
	});
	turnIndicator.innerText = `${game.currentPlayer.name}'s turn`;
}

function updateScore() {
	playerOneScore.innerText = game.playerOne.score;
	playerTwoScore.innerText = game.playerTwo.score;
}

function resetBoard() {
	squares.forEach((square) => (square.innerText = ""));
	game.resetGame();
}

function winShow(player, draw) {
	if (draw) winOrDrawText.innerText = "DRAW";
	else winOrDrawText.innerText = `${player.name} is the winner!`;

	/* resetBoard(); */
	modal.style.display = "block";
	close.onclick = function () {
		modal.style.display = "none";
		resetBoard();
	};
}

function printScoreBoard() {
	playerOneName.innerText = game.playerOne.name;
	playerTwoName.innerText = game.playerTwo.name;
	turnIndicator.innerText = `${game.currentPlayer.name}'s turn`;
	updateScore();
}

function toggleBotPlay() {
	botPlaying = !botPlaying;
	if (botPlaying) {
		toggleBot.style.backgroundColor = "green";
		game.playerTwo.name = "BOT";
		playerTwoName.innerText = "BOT";
		game.resetGame();
		paintBoard();
		resetBoard();
	} else if (!botPlaying) toggleBot.style.backgroundColor = "red";
}

init();
