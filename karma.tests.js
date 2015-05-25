var chai = require("chai");
var sinonChai = require("sinon-chai");

chai.use(sinonChai);

var testsContext = require.context("./app", true, /\_test\.jsx?$/);
testsContext.keys().forEach(testsContext);