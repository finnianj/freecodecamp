class SudokuSolver {

  validate(puzzleString) {
    let reg = /^[\d\./]*$/
    return reg.test(puzzleString)
  }

  checkRowPlacement(puzzleString, row_letter, column, value) {
    row_letter = row_letter.toUpperCase().charCodeAt(0)
    let row_index = (row_letter % 65);
    console.log("Row index: " + row_index)
    let row = puzzleString.split('').slice(row_index, (row_index + 10))
    return row.some((item) => item == value)
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;
