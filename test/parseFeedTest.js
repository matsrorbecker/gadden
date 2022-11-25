"use strict";

const fs = require("fs");
const path = require("path");
const {
  parseFeed,
  missingSpacePattern,
} = require("../lib/parseFeed");

describe("parseFeed", () => {
  const filePath = path.join(__dirname, "/data/nyheter.rss");
  const nyheter = fs.readFileSync(filePath, "utf-8");
  const items = parseFeed(nyheter);

  it("parses all items in feed", () => {
    expect(items.length).to.equal(20);
  });

  it("sets all fields on all items, with correct types", () => {
    items.forEach((item) => {
      expect(item.title).to.exist;
      expect(item.description).to.exist;
      expect(item.pubDate).to.exist;
      expect(Object.prototype.toString.call(item.pubDate)).to.equal("[object Date]");
      expect(item.link).to.exist;
      expect(item.isPremium).to.exist;
      expect(typeof item.isPremium).to.equal("boolean");
    });
  });

  it("replaces occurrences of '&nbsp;' entity with space", () => {
    items.forEach((item) => {
      expect(/&nbsp;/.test(item.description), item.description).to.be.false;
    });
  });

  it("replaces occurrences of consecutive spaces with one space", () => {
    items.forEach((item) => {
      expect(/\s\s/.test(item.description), item.description).to.be.false;
    });
  });

  it("adds space between sentences in description if missing", () => {
    items.forEach((item) => {
      expect(missingSpacePattern.test(item.description)).to.be.false;
    });
  });
});
