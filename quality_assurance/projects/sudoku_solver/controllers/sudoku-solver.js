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
    console.log("Good row value? " + !row.some((item) => item == value))
    return !row.some((item) => item == value)
  }

  checkColPlacement(puzzleString, row, column, value) {
    let col_num = column - 1
    let array = puzzleString.split('')
    let col_extract = array.filter((_num, i) => i % 9 == col_num)
    console.log("Good column value? " + !col_extract.some(num => num == value))
    return !col_extract.some(num => num == value)
  }

  checkRegionPlacement(puzzleString, row_letter, column, value) {
    row_letter = row_letter.toUpperCase().charCodeAt(0)
    let row_group = Math.floor((row_letter % 65) / 3);
    console.log("Row group: " + row_group)
    let col_group = Math.floor((column - 1) / 3);
    console.log("Col group: " + col_group)
    let array = puzzleString.split('')
    let row_extract = array.filter((_num, i) => (i >= (row_group * 27) && i < ((row_group + 1) * 27)))
    console.log(row_extract)

  }

  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;
