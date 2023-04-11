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
    console.log("Is this row value already taken? " + row.some((item) => item == value))
    return row.some((item) => item == value)
  }

  checkColPlacement(puzzleString, row, column, value) {
    let col_num = column - 1
    let array = puzzleString.split('')
    let col_extract = array.filter((_num, i) => i % 9 == col_num)
    console.log("Is this column value already taken? " + col_extract.some(num => num == value))
    return col_extract.some(num => num == value)
  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;
