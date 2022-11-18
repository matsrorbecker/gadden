/* eslint-disable no-console */
"use strict";

const { format, isToday } = require("date-fns");

let firstTime = true;

module.exports = (items) => {
  if (firstTime) {
    console.log("\n");
    console.log("SENASTE NYTT FRÅN EXPRESSEN:");
    firstTime = false;
  }

  items.forEach((item) => {
    const datePattern = isToday(item.pubDate) ? "HH.mm" : "d/M HH.mm";
    const timeStamp = format(item.pubDate, datePattern);
    console.log("\n");
    console.log(`\x1b[91m${timeStamp}\x1b[0m ${item.title}`);
    console.log(`${item.isPremium ? "\x1b[44m PREMIUM \x1b[0m " : ""}${item.description}`);
    console.log(item.link);
  });
};
