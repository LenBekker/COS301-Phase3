const database = require("./database.js");
var express = require('express');
var MockExpressResponse = require('mock-express-response');

//Disable console logs
console.log = function() {}

test('Test APIUser route', () => {
    var uID = 1;
    var Option = 1;
    var res = new MockExpressResponse();
    var statusCode = 200; //HTTP Code

    //Always returns 200.. (because route exists) need to try get it to be affected by database functionality.
    expect(database.APIUser(uID, Option, res)).toBe(statusCode);
});
