/* eslint-disable no-console */
"use strict";

const formatItem = require("./formatItem");

let firstTime = true;

module.exports = (items) => {
  if (firstTime) {
    console.log("\n");
    console.log("SENASTE NYTT FRÅN EXPRESSEN:");
    firstTime = false;
  }

  items.forEach((item) => console.log(formatItem(item)));
};
