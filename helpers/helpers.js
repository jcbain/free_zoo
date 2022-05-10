const process = require("process");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getHosts = () => {
  if (process.env.DEV) {
    return {
      dogs: "http://dogs:9999",
      cats: "http://cats:8888",
      rand: "http://random:7777",
    };
  }

  return {
    dogs: "http://localhost:9999",
    cats: "http://localhost:8888",
    rand: "http://localhost:7777",
  };
};

module.exports = { sleep, getHosts };
