"use strict";

const BASE_URL = "https://feeds.expressen.se";

const fetchAllFeeds = (sections = [], fetcher) => {
  if (!sections.length) sections.push("nyheter");
  const urls = sections.map((section) => `${BASE_URL}${section.startsWith("/") ? "" : "/"}${section}`);
  return Promise.all(urls.map(fetcher));
};

module.exports = {
  fetchAllFeeds,
  BASE_URL,
};
