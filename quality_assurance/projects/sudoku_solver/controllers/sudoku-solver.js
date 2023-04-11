class SudokuSolver {

  validate(puzzleString) {
    let reg = /^[\d\./]*$/
    return reg.test(puzzleString)
  }

  checkRowPlacement(puzzleString, row_letter, column, value) {
    let row_index = row_leter % 97;
    // 97 this is the character code of A
    let row = puzzlestring.split('').slice(row_index, row_index + 10)
    console.log(row)
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;
