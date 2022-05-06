const tracer = require("../tracer-experimental")("rand");

const express = require("express");
const axios = require("axios");

// const observer = require("../observer");

// try {
//   observer("rando");
// } catch (e) {
//   console.error(`observer not running\n`, e);
// }

const services = [
  "http://cats:8888/idk",
  "http://cats:8888/cats",
  "http://dogs:9999/idk",
  "http://dogs:9999/dogs",
];

const app = express();
const PORT = 7777;

app.get("/", async (req, res) => {
  const index = Math.floor(Math.random() * 4);
  const animals = await axios.get(services[index]);

  setTimeout(() => {
    res.json(animals.data);
  }, 4000);
});

app.listen(PORT, () => console.log(`🍩 on port ${PORT}`));
