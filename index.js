#!/usr/bin/env node

/* eslint-disable no-console */

"use strict";

const fetchFeed = require("./lib/fetchFeed");
const { fetchAllFeeds } = require("./lib/fetchAllFeeds");
const formatItem = require("./lib/formatItem");
const { parseFeed } = require("./lib/parseFeed");

const FETCH_INTERVAL = 30000;
let ignoreNewsBefore = new Date(0);
let firstTime = true;

const sections = process.argv.slice(2);

const poll = async () => {
  const feeds = await fetchAllFeeds(sections, fetchFeed);
  const filteredFeeds = feeds.filter(Boolean);
  const items = filteredFeeds.map(parseFeed)
    .flat()
    .filter((item) => item.pubDate > ignoreNewsBefore && !item.link.includes("/brand-studio/"))
    .sort((a, b) => a.pubDate - b.pubDate);
  const uniqueItems = [ ...new Map(items.map((item) => [ item.link, item ])).values() ];
  if (!uniqueItems.length) return;
  ignoreNewsBefore = uniqueItems[uniqueItems.length - 1].pubDate;
  if (firstTime) {
    console.log("\n");
    console.log("SENASTE NYTT FRÅN EXPRESSEN:");
    firstTime = false;
  }
  uniqueItems.forEach((item) => console.log(formatItem(item)));
};

setInterval(poll, FETCH_INTERVAL);
poll();
