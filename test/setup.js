"use strict";

const chai = require("chai");
const spies = require("chai-spies");

chai.use(spies);

global.expect = chai.expect;
