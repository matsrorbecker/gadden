#!/usr/bin/env node

"use strict";

const fetchFeed = require("./lib/fetchFeed");
const parseFeed = require("./lib/parseFeed");
const logItems = require("./lib/logItems");

const BASE_URL = "https://feeds.expressen.se";
const FETCH_INTERVAL = 30000;
let ignoreNewsBefore = new Date(0);

const poll = async () => {
  const url = BASE_URL; // TODO: Add support for sections
  const feed = await fetchFeed(url);
  const items = parseFeed(feed)
    .filter((item) => item.pubDate > ignoreNewsBefore && !item.link.includes("/brand-studio/"))
    .sort((a, b) => a.pubDate - b.pubDate);
  if (items.length) ignoreNewsBefore = items[items.length - 1].pubDate;
  logItems(items);
};

setInterval(poll, FETCH_INTERVAL);
poll();
