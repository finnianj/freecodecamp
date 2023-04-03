function ConvertHandler() {

  this.getNum = function(input) {
    if (input.match(/[klgm]/i)) {
      let index = input.match(/[klgm]/i).index;
      input = input.split('')
      let result = [ input.slice(0, index).join(''), input.slice(index).join('').toLowerCase()];
      return result;
    } else {
      console.log("Invalid metric")
      return "Invalid metric"
    }
  };

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

    switch (initUnit) {
      case 'kg':
        result = [initNum / lbsToKg, "lbs"]
        break;
      case 'gal':
        result = [initNum * galToL, "L"]
        break;
      case 'l':
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
      case 'l':
        return "litres"
      case 'L':
        return "litres"
      case 'mi':
        return "miles"
      case 'km':
        return "kilometres"
      case 'lbs':
        return "pounds"
    }
  }

}

module.exports = ConvertHandler;
