"use strict";

const cheerio = require("cheerio");
const consecutiveSpacesPattern = /\s{2,}/g;
const missingSpacePattern = /([\wÅÄÖåäö”)][.?!])([”A-ZÅÄÖ–])/g;

const parseFeed = (feed) => {
  const $ = cheerio.load(feed, { xmlMode: true });
  return Array.from($("item")).map((item) => {
    const title = $("title", item).text()
      .replace(consecutiveSpacesPattern, " ")
      .trim();
    const htmlDescription = $("description", item).text();
    const description = $(htmlDescription).text()
      .replace(/&nbsp;/g, " ")
      .replace(consecutiveSpacesPattern, " ")
      .replace(missingSpacePattern, "$1 $2")
      .trim();
    const pubDate = $("pubDate", item).text();
    const link = $("link", item).text();
    const isPremium = $("isPremium", item).text();
    return {
      title,
      description,
      pubDate: new Date(pubDate),
      link,
      isPremium: isPremium === "true",
    };
  });
};

module.exports = {
  parseFeed,
  missingSpacePattern,
};
