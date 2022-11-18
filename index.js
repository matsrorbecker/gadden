#!/usr/bin/env node

"use strict";

const fetchFeed = require("./lib/fetchFeed");
const parseFeed = require("./lib/parseFeed");
const logItems = require("./lib/logItems");

const BASE_URL = "https://feeds.expressen.se";
const FETCH_INTERVAL = 30000;
let ignoreNewsBefore = new Date(0);

const sections = process.argv.slice(2);
if (!sections.length) sections.push("/");
const urls = sections.map((section) => `${BASE_URL}${section.startsWith("/") ? "" : "/"}${section}`);

const poll = async () => {
  const feeds = await Promise.all(urls.map(fetchFeed));
  const filteredFeeds = feeds.filter(Boolean);
  const items = filteredFeeds.map(parseFeed)
    .flat()
    .filter((item) => item.pubDate > ignoreNewsBefore && !item.link.includes("/brand-studio/"))
    .sort((a, b) => a.pubDate - b.pubDate);
  const uniqueItems = [ ...new Map(items.map((item) => [ item.link, item ])).values() ];
  if (uniqueItems.length) ignoreNewsBefore = uniqueItems[uniqueItems.length - 1].pubDate;
  logItems(uniqueItems);
};

setInterval(poll, FETCH_INTERVAL);
poll();
