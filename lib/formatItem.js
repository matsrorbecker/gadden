"use strict";

const { format, isToday } = require("date-fns");

module.exports = (item) => {
  const datePattern = isToday(item.pubDate) ? "HH.mm" : "d/M HH.mm";
  const timeStamp = format(item.pubDate, datePattern);
  const title = `\x1b[91m${timeStamp}\x1b[0m ${item.title}`;
  const description = `${item.isPremium ? "\x1b[44m PREMIUM \x1b[0m " : ""}${item.description}`;
  return `\n\n${title}\n${description}\n${item.link}`;
};
