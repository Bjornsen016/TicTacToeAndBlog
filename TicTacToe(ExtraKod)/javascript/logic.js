export class Game {
	constructor(playerOneName = "Player one", playerTwoName = "Player two") {
		this.playerOne = { id: 1, name: playerOneName, score: 0, markedSpots: [] };
		this.playerTwo = { id: 2, name: playerTwoName, score: 0, markedSpots: [] };

		this.getFromLocalStorage();
		this.currentPlayer = this.playerOne;

		this.winConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		this.filledSpots = 0;
	}

	checkWin() {
		let hasWon = false;
		this.winConditions.forEach((condtion) => {
			if (
				this.currentPlayer.markedSpots.includes(condtion[0]) &&
				this.currentPlayer.markedSpots.includes(condtion[1]) &&
				this.currentPlayer.markedSpots.includes(condtion[2])
			) {
				hasWon = true;
			}
		});
		return hasWon;
	}

	checkDraw() {
		if (this.filledSpots < 9) return;

		this.resetGame();
		return true;
	}

	play(gridSpot) {
		if (gridSpot > 8 || gridSpot < 0) return false;
		if (this.isSpotTaken(gridSpot)) return false;

		this.currentPlayer.markedSpots.push(gridSpot);
		this.filledSpots++;
		if (this.checkWin()) {
			this.currentPlayer.score++;
			this.saveToLocalStorage();
			return true;
		}
		this.swapCurrentPlayer();
	}

	isSpotTaken(gridSpot) {
		if (this.playerOne.markedSpots.includes(gridSpot)) return true;
		if (this.playerTwo.markedSpots.includes(gridSpot)) return true;
	}

	swapCurrentPlayer() {
		if (this.currentPlayer.id === 1) this.currentPlayer = this.playerTwo;
		else if (this.currentPlayer.id === 2) this.currentPlayer = this.playerOne;
	}
	resetGame() {
		this.playerOne.markedSpots = [];
		this.playerTwo.markedSpots = [];
		this.filledSpots = 0;
		this.currentPlayer = this.playerOne;
	}

	getFromLocalStorage() {
		if (localStorage.getItem("playerOneName") == null) return;
		if (localStorage.getItem("playerTwoName") == null) return;

		this.playerOne.name = JSON.parse(localStorage.getItem("playerOneName"));
		this.playerTwo.name = JSON.parse(localStorage.getItem("playerTwoName"));
		this.playerOne.score = JSON.parse(localStorage.getItem("playerOneScore"));
		this.playerTwo.score = JSON.parse(localStorage.getItem("playerTwoScore"));
	}

	saveToLocalStorage() {
		localStorage.setItem("playerOneName", JSON.stringify(this.playerOne.name));
		localStorage.setItem("playerTwoName", JSON.stringify(this.playerTwo.name));
		localStorage.setItem(
			"playerOneScore",
			JSON.stringify(this.playerOne.score)
		);
		localStorage.setItem(
			"playerTwoScore",
			JSON.stringify(this.playerTwo.score)
		);
	}

	botMove() {
		let randomGridNumber = Math.floor(Math.random() * 9);

		while (this.isSpotTaken(randomGridNumber)) {
			randomGridNumber = Math.floor(Math.random() * 9);
		}
		return this.play(randomGridNumber);
	}
}
