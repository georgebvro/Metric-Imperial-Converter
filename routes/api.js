'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const app = require('../server.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const initNum = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(req.query.input);
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      res.json('invalid number and unit');
    } else if (initNum === 'invalid number') {
      res.json('invalid number');
    } else if (initUnit === 'invalid unit') {
      res.json('invalid unit');
    } else {
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const initSpellOutUnit = convertHandler.spellOutUnit(initUnit);
      const returnSpellOutUnit = convertHandler.spellOutUnit(returnUnit);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const convertString = convertHandler.getString(initNum, initSpellOutUnit, returnNum, returnSpellOutUnit);
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: convertString
      });
    };
  });
};

