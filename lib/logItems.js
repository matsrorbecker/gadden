/* eslint-disable no-console */
"use strict";

const { format, isToday } = require("date-fns");

let firstTime = true;

module.exports = (items) => {
  if (firstTime) {
    console.log("\n");
    console.log("*********************************************");
    console.log("* ---=== SENASTE NYTT FRÅN EXPRESSEN ===--- *");
    console.log("*********************************************");
    firstTime = false;
  }

  items.forEach((item) => {
    const datePattern = isToday(item.pubDate) ? "HH.mm" : "d/M HH.mm";
    const timeStamp = format(item.pubDate, datePattern);
    console.log("\n");
    console.log(timeStamp);
    console.log(item.title);
    console.log(item.description);
    console.log(item.link);
  });
};
