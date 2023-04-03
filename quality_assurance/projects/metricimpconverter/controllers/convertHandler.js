function ConvertHandler() {

  this.getNum = function(input) {
    console.log(input)
    let test = input.match(/mi$|kg$|gal$|l$|km$|lbs$/i)
    console.log(test)
    if (test != null) {
      let index = test.index;
      input = input.split('')
      let unit = input.slice(index).join('').toLowerCase()
      if (unit == 'l') unit = 'L'
      let num = eval(input.slice(0, index).join(''))

      if (num == 0) {
        return [ 1, unit]
      } else if (isGoodNum(num) == false) {
        console.log("bad num")
        return 'invalid number'
      } else {
        console.log("good num")

        return [ num, unit];
      }

    } else {
      input = input.slice(0, input.match(/[a-z]/).index)
      console.log("DANGER: " + input)
      if (isGoodNum(input) == false) {
        return 'invalid number and unit'
      }
      return "invalid unit"
    }
  };

  // function isGoodNum(str) {
  //   console.log(str)
  //   var n = Math.floor(Number(str));
  //   return n !== Infinity && String(n) === str && n >= 0;
  // }

  function isGoodNum(str) {
    return /^\+?(0|[1-9])\d*(\.|\/)?\d*?(\.|\/)?\d*?$/.test(str);
  }

  // this.getUnit = function(input) {
  //   let result;

  //   return result;
  // };

  // this.getReturnUnit = function(initUnit) {
  //   let result;

  //   return result;
  // };

  this.spellOutUnit = function(unit) {
    let result;

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    // initNum = parseInt(initNum, 10)
    console.log(initNum)
    console.log(typeof initNum)
    switch (initUnit) {
      case 'kg':
        result = [initNum / lbsToKg, "lbs"]
        break;
      case 'gal':
        result = [initNum * galToL, "L"]
        break;
      case 'L':
        result = [initNum / galToL, "gal"]
        break;
      case 'mi':
        result = [initNum * miToKm, "km"]
        break;
      case 'km':
        result = [initNum / miToKm, "mi"]
        break;
      case 'lbs':
        result = [initNum * lbsToKg, "kg"]
        break;
      default:
        console.log("Invalid metric")
        result = "Invalid metric"
    }
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    initUnit = getWord(initUnit);
    returnUnit = getWord(returnUnit)
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    return result;
  };

  function getWord(val) {
    switch (val) {
      case 'kg':
        return "kilograms"
      case 'gal':
        return "gallons"
      case 'L':
        return "litres"
      case 'mi':
        return "miles"
      case 'km':
        return "kilometers"
      case 'lbs':
        return "pounds"
    }
  }

}

module.exports = ConvertHandler;
