"use strict";

const axios = require("axios");
const { version } = require("../package.json");
const logError = require("./logError");

const USER_AGENT = `gadden v${version} (https://github.com/matsrorbecker/gadden, mats@rorbecker.com)`;

module.exports = async (url) => {
  try {
    const response = await axios.get(url, { headers: { "User-Agent": USER_AGENT } });
    return response.data;
  } catch (err) {
    logError(`Något gick snett när nyheter skulle hämtas från ${url}: ${err.message}`);
  }
};
