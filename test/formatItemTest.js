"use strict";

const formatItem = require("../lib/formatItem");

describe("formatItem", () => {
  const item = {
    title: "Oligarkens lyxliv på egen ö – som i en James Bond-film",
    description: "Det byggs en lyxresort på den ryske oligarken Dmitrij Rybolovlevs privata grekiska ö Skorpios. En gång tillhörde ön den stenrike grekiske skeppsredaren Ari Onassis. Det var här han och presidentänkan Jackie Kennedy gifte sig. Nu utspelar sig något som påminner om en James Bond-film. De 400 lokala byggnadsarbetarna avtvingas sina mobiltelefoner när de stiger i land på Skorpios. Inget får fotograferas. Alltmedan prickskyttar sköter övervakningen.",
    pubDate: new Date("2022-11-21T03:30:00.000Z"),
    link: "https://www.expressen.se/ekonomi/oligarkens-lyxliv-pa-egen-o-som-i-en-james-bond-film/",
    isPremium: true,
  };
  const formattedItem = formatItem(item);
  const today = new Date();
  today.setHours(4);
  today.setMinutes(30);
  const otherFormattedItem = formatItem({
    ...item,
    pubDate: today,
    isPremium: false,
  });
  const [ title, description, link ] = formattedItem.split("\n").slice(2);
  const [ otherTitle, otherDescription ] = otherFormattedItem.split("\n").slice(2);

  describe("it converts parsed items to nicely formatted strings", () => {
    it("puts two newlines in the beginning", () => {
      expect(formattedItem).to.match(/^\n\n/);
    });

    it("adds a timestamp to the title row", () => {
      expect(title).to.match(/21\/11 04.30/);
    });

    it("omits the date if the text is from current day", () => {
      expect(otherTitle).to.match(/04.30/);
      expect(otherTitle).to.not.match(/\d{1,2}\/\d{1,2} 04.30/);
    });

    it("marks premium articles with a label", () => {
      expect(description).to.match(/\sPREMIUM\s/);
    });

    it("omits label on non premium articles", () => {
      expect(otherDescription).to.not.match(/\sPREMIUM\s/);
    });

    it("puts the link on a separate row below the text", () => {
      expect(link).to.equal("https://www.expressen.se/ekonomi/oligarkens-lyxliv-pa-egen-o-som-i-en-james-bond-film/");
    });
  });
});
