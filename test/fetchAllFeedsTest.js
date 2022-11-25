"use strict";

const chai = require("chai");
const { fetchAllFeeds, BASE_URL } = require("../lib/fetchAllFeeds");

describe("fetchAllFeeds", () => {
  let fetchFeed;
  beforeEach(() => {
    fetchFeed = chai.spy();
  });

  it("fetches rss feeds for all provided sections", () => {
    const sections = [ "sport", "kultur", "noje" ];
    fetchAllFeeds(sections, fetchFeed);
    expect(fetchFeed).to.have.been.called.exactly(3);
    expect(fetchFeed).to.have.been.first.called.with(`${BASE_URL}/${sections[0]}`);
    expect(fetchFeed).to.have.been.second.called.with(`${BASE_URL}/${sections[1]}`);
    expect(fetchFeed).to.have.been.third.called.with(`${BASE_URL}/${sections[2]}`);
  });

  it("fetches rss feed for 'nyheter' if no section is provided", () => {
    fetchAllFeeds(undefined, fetchFeed);
    expect(fetchFeed).to.have.been.called.once;
    expect(fetchFeed).to.have.been.called.with(`${BASE_URL}/nyheter`);
  });

  it("handles sections with slash before or after section name", () => {
    const sections = [ "/sport", "kultur/", "/noje/" ];
    fetchAllFeeds(sections, fetchFeed);
    expect(fetchFeed).to.have.been.called.exactly(3);
    expect(fetchFeed).to.have.been.first.called.with(`${BASE_URL}/sport`);
    expect(fetchFeed).to.have.been.second.called.with(`${BASE_URL}/kultur/`);
    expect(fetchFeed).to.have.been.third.called.with(`${BASE_URL}/noje/`);
  });
});
