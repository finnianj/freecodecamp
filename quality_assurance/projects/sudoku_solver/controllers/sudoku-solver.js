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
    let grid = this.transform(puzzleString)
    let solved = this.solveSudoku(grid, 0, 0)
    if (!solved) return false
    // let solvedString = solved.flat().join("")
    console.log(solved)
  }

  solveSudoku(grid, row, col) {
    if (row == 9 - 1 && col ==9) return true
    if (col == 9) {
      row++;
      col = 0;
    }

    if (grid[row][col] != 0) return this.solveSudoku(grid, row, col + 1);

    for (let num = 1; num < 10; num++) {

      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;
        if (this.solveSudoku(grid, row, col + 1)) return true
      }

      grid[row][col] = 0;
    }
    return false
  }

  isSafe(grid, row, col, num) {

    for(let x = 0; x <= 8; x++) if (grid[row][x] == num) return false
    for(let x = 0; x <= 8; x++) if (grid[x][col] == num) return false

    let startRow = row - (row % 3)
    let startCol = col - (col % 3)

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] == num) return false
      }
      return true
    }
  }

  transform(puzzleString) {
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    let row = -1
    let col = 0

    for (let i = 0; i < puzzleString.length; i ++) {
      if (i % 9 == 0) {
        row++
      }
      if (col % 9 == 0) {
        col = 0;
      }

      grid[row][col] = puzzleString[i] === '.' ? 0 : +puzzleString[i];
      col++;
    }
    return grid;
  }

}

module.exports = SudokuSolver;
