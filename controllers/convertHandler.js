const { init } = require("../server");

function ConvertHandler() {
  
  const units = [['gal', 'l'], ['mi', 'km'], ['lbs', 'kg']];
  const spellOutUnits = { gal: 'gallons', l: 'liters', mi: 'miles', km: 'kilometers', lbs: 'pounds', kg: 'kilograms' }

  this.getNum = function(input) {
    let result;
    const numberCandidate = input.match(/^\d+\.?\d*\/?\d*\.?\d*\/?/)?.[0];
    if (!numberCandidate) result = 1;
    else if (input.indexOf('//') !== -1) result = 'invalid number';
    else {
      try {
        eval(numberCandidate);
        result = eval(numberCandidate);
      } catch (e) {
          //console.error(e.message);
          result = 'invalid number';
        }
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const unitCandidate = input.match(/[a-zA-Z]*$/)[0]?.toLowerCase();
    units.forEach(unitPair => {
      if (unitPair[0] === unitCandidate || unitPair[1] === unitCandidate) result = unitCandidate;
    });
    return result ? result === 'l' ? 'L' : result : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    initUnit = initUnit.toLowerCase();
    const unitPairFound = units.find(unitPair => unitPair[0] === initUnit || unitPair[1] === initUnit);
    if (unitPairFound[0] === initUnit) result = unitPairFound[1]; 
    else result = unitPairFound[0];
    return result === 'l' ? 'L' : result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    result = spellOutUnits[unit.toLowerCase()];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal': result = initNum * galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'L': result = initNum / galToL; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'km': result = initNum / miToKm;
    }
    result = Math.round(result * 1e5) / 1e5;
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
