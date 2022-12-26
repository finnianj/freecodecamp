function checkCashRegister(price, cash, cid) {
  let changeRequired = cash - price + 0.001;
  let returnChange = cid.reverse().map(item => [item[0], 0]);
  let cashRegister = cid.map(item => [item[0], item[1]])
  let registerSum = cashRegister.reduce((a, b) => a + b[1], 0);
  let amounts = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]

  if (registerSum == changeRequired - 0.001) {
    return {status: "CLOSED", change: cashRegister.reverse().map(item => [item[0], item[1]])}
  }

  for (let i = 0; i < cashRegister.length; i++) {
    while(amounts[i] <= changeRequired && cashRegister[i][1] > 0) {
      cashRegister[i][1] -= amounts[i];
      changeRequired -= amounts[i];
      returnChange[i][1] += amounts[i];
    }
  }

  returnChange = returnChange.filter(item => item[1] != 0)
  let returnSum = returnChange.reduce((a, b) => a + b[1], 0)

  if (returnSum < changeRequired) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }

  return {status: "OPEN", change: returnChange}

  }

  checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
