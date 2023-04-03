function ConvertHandler() {

  this.getNum = function(input) {
    let index = input.match(/[klgm]/i).index;
    input = input.split('')
    let result = [ input.slice(0, index).join(''), input.slice(index).join('').toLowerCase()];
    return result;
  };

  // this.getUnit = function(input) {
  //   let result;

  //   return result;
  // };

  this.getReturnUnit = function(initUnit) {
    let result;

    return result;
  };

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
        console.log("kilograms>>>")
        result = [initNum / lbsToKg, "lbs"]
        break;
      case 'gal':
        console.log("gallons")
        result = [initNum * galToL, "L"]
        break;
      case 'l':
        console.log("litres")
        result = [initNum / galToL, "gal"]
        break;
      case 'mi':
        console.log("miles")
        result = [initNum * miToKm, "km"]
        break;
      case 'km':
        console.log("kilometeres")
        result = [initNum / miToKm, "mi"]
        break;
      case 'lbs':
        console.log("pounds")
        result = [initNum * lbsToKg, "kg"]
        break;
      default:
        console.log("Invalid input given");
    }

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };

}

module.exports = ConvertHandler;
