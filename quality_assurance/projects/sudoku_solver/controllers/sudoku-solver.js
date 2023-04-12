class SudokuSolver {

  validate(puzzleString) {
    let reg = /^[\d\.]*$/
    return reg.test(puzzleString)
  }

  checkValidCoordinates(coordinates) {
    if (coordinates.length > 2) return false
    let chars = /[A-I]/i
    let nums = /[1-9]/
    if (chars.test(coordinates[0]) && nums.test(coordinates[1])) {
      return true
    }
    return false
  }

  checkValidValue(value) {
    if (value.length > 1) return false
    let nums = /[1-9]/
    return nums.test(value)
  }

  checkExactSquare(puzzleString, row_letter, column, value) {
    let row_multiplier = (row_letter.toUpperCase().charCodeAt(0) % 65) * 9
    let index = row_multiplier + (column - 1)
    return (puzzleString[index] != '.' && puzzleString[index] == value)
  }

  checkRowPlacement(puzzleString, row_letter, column, value) {
    row_letter = row_letter.toUpperCase().charCodeAt(0)
    let row_index = (row_letter % 65);
    // console.log("Row index: " + row_index)
    let row = puzzleString.split('').slice(row_index, (row_index + 9))
    // console.log("Good row value? " + !row.some((item) => item == value))
    return !row.some((item) => item == value)
  }

  checkColPlacement(puzzleString, row, column, value) {
    let col_num = column - 1
    let array = puzzleString.split('')
    let col_extract = array.filter((_num, i) => i % 9 == col_num)
    // console.log("Good column value? " + !col_extract.some(num => num == value))
    return !col_extract.some(num => num == value)
  }

  checkRegionPlacement(puzzleString, row_letter, column, value) {
    row_letter = row_letter.toUpperCase().charCodeAt(0)
    let row_group = Math.floor((row_letter % 65) / 3);
    let col_group = Math.floor((column - 1) / 3);
    let array = puzzleString.split('')
    let row_extract = array.filter((_num, i) => (i >= (row_group * 27) && i < ((row_group + 1) * 27)))
    let region = row_extract.filter((_num, i) => {
      return ((i % 9) >= col_group * 3) && ((i % 9) <= (((col_group + 1) * 3) - 1))
    })
    return !region.some((item) => item == value)
  }

  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;
