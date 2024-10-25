const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { response } = require('express');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert a valid input such as 10L', () => {
    fetch('https://3000-freecodecam-boilerplate-zh0c0qztydm.ws-eu116.gitpod.io/api/convert?input=10L')
      .then(response => response.json())
      .then(json => assert.equal(
        JSON.stringify(json), 
        '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}',
        'Failure converting a valid input such as 10L.'))
  });
  test('Convert an invalid input such as 32g', () => {
    fetch('https://3000-freecodecam-boilerplate-zh0c0qztydm.ws-eu116.gitpod.io/api/convert?input=32g')
      .then(response => response.text())
      .then(text => assert.equal(text.replace(/^"|"$/g, ''), 'invalid unit', 'Failure converting an invalid input such as 32g.'));
  });
  test('Convert an invalid number such as 3/7.2/4kg', () => {
    fetch('https://3000-freecodecam-boilerplate-zh0c0qztydm.ws-eu116.gitpod.io/api/convert?input=3/7.2/4kg')
      .then(response => response.text())
      .then(test => assert.equal(test.replace(/^"|"$/g, ''), 'invalid number', "Failure converting an invalid number such as 3/7.2/4kg."));
  });
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', () => {
    fetch('https://3000-freecodecam-boilerplate-zh0c0qztydm.ws-eu116.gitpod.io/api/convert?input=3/7.2/4kilomegagram')
      .then(response => response.text())
      .then(text => assert.equal(text.replace(/^"|"$/g, ''), 'invalid number and unit', "Failure converting an invalid number AND unit such as 3/7.2/4kilomegagram."));
  });
  test('Convert with no number such as kg', () => {
    fetch('https://3000-freecodecam-boilerplate-zh0c0qztydm.ws-eu116.gitpod.io/api/convert?input=kg')
      .then(response => response.json())
      .then(json => assert.equal(
        JSON.stringify(json), 
        '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}',
        'Failure converting with no number such as kg.'))      
  });
});
