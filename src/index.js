module.exports = function solveSudoku(matrix) {
	// your solution
	let arrayOfSquares = [[], [], []];
	divideIntoSquares();

	let minCell = {
		candidates: [],
		minCellI: null,
		minCellJ: null
	}

	while (true) {
		let result = checkHiddenSigletones();
		if (typeof result === 'object') {
			return result;
		}
		if (result === 0) {
			break;
		}
		if (result === false) {
			return false;
		} else {
		}
	}

	for (let i = 0; i < minCell.candidates.length; i++) {
		let copyMatrix = [];
		for (let i = 0; i < matrix.length; i++) {
			copyMatrix[i] = matrix[i].slice();
		}
		copyMatrix[minCell.minCellI][minCell.minCellJ] = minCell.candidates[i];
		let answer = solveSudoku(copyMatrix);
		if (typeof answer === 'object') {
			return answer;
		}
	}

	function checkHiddenSigletones() {
		minCell.candidates = [];
		let filledCellsCount = 0;
		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix.length; j++) {
				if (matrix[i][j] === 0) {
					let arr = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
					for (let k = 0; k < matrix.length; k++) {
						if (matrix[i][k] !== 0) {
							arr.splice(arr.indexOf(matrix[i][k]), 1);
						}
					}
					for (let k = 0; k < matrix.length; k++) {
						if (matrix[k][j] !== 0 && arr.indexOf(matrix[k][j]) !== -1) {
							arr.splice(arr.indexOf(matrix[k][j]), 1);
						}
					}
					let squareToSearch = arrayOfSquares[Math.floor(i / 3)][Math.floor(j / 3)];
					for (let k = 0; k < squareToSearch.length; k++) {
						if (squareToSearch[k] !== 0 && arr.indexOf(squareToSearch[k]) !== -1) {
							arr.splice(arr.indexOf(squareToSearch[k]), 1);
						}
					}

					if (arr.length > 1 && (arr.length < minCell.candidates.length || minCell.candidates.length === 0)) {
						minCell.candidates = arr.slice();
						minCell.minCellI = i;
						minCell.minCellJ = j;
					}
					if (arr.length === 1) {
						squareToSearch.push(arr[0]);
						matrix[i][j] = arr[0];
						filledCellsCount++;
					}
					if (arr.length < 1) {
						return false;
					}
				}
			}
		}

		let cellsCounter = 0;
		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix.length; j++) {
				if (matrix[i][j] !== 0) {
					cellsCounter++;
				}
			}
		}
		if (cellsCounter === matrix.length * matrix.length) {
			return matrix;
		}
		return filledCellsCount;
	}

	function divideIntoSquares() {
		for (let i = 0; i < matrix.length; i += 3) {
			for (let j = 0; j < matrix.length; j += 3) {
				let arr = [];
				for (let k = j; k <= j + 2; k++) {
					for (let l = i; l <= i + 2; l++) {
						arr.push(matrix[k][l]);
					}
				}
				arrayOfSquares[j / 3].push(arr);
			}
		}
	}
}