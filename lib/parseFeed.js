"use strict";

const cheerio = require("cheerio");

module.exports = (feed) => {
  const $ = cheerio.load(feed, { xmlMode: true });
  return Array.from($("item")).map((item) => {
    const title = $("title", item).text().trim();
    const htmlDescription = $("description", item).text();
    const description = $(htmlDescription).text().replace(/&nbsp;/g, " ").trim();
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
