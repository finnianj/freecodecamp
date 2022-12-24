function checkCashRegister(price, cash, cid) {
  let changeToGive = (cash - price) * 100;
  let denoms = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1]
  let changeGiven = [
    ["ONE HUNDRED", 0],
    ["TWENTY", 0],
    ["TEN", 0],
    ["FIVE", 0],
    ["ONE", 0],
    ["QUARTER", 0],
    ["DIME", 0],
    ["NICKEL", 0],
    ["PENNY", 0],
  ];

  let register = [...cid].reverse().map(item => [item[0], item[1] * 100]);
  let sum = register.reduce((a, b) => (a + b[1]),0) / 100
  if (sum == changeToGive / 100) {
    return {status: "CLOSED", change: [...cid]}
  } else {
    for (let i = 0; i < register.length; i++) {
      while (denoms[i] <= changeToGive && register[i][1] > 0) {
        changeGiven[i][1] += denoms[i];
        changeToGive -= denoms[i];
        register[i][1] -= denoms[i];
      }
    }
  }


let change = changeGiven.map(item => [item[0], item[1] / 100]).filter(coin => coin[1] != 0)

let total = change.reduce((a, b) => a + b[1], 0)

if (total < changeToGive) {
  return {status: "INSUFFICIENT_FUNDS", change: []};
}

console.log(change)
return {status: "OPEN", change: change}
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
