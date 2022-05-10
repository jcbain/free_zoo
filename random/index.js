const tracer = require("../tracer-experimental")("rand");

const express = require("express");
const axios = require("axios");

const { getHosts } = require("../helpers/helpers");

const hosts = getHosts();

const services = [
  `${hosts.cats}/idk`,
  `${hosts.cats}/cats`,
  `${hosts.dogs}/idk`,
  `${hosts.dogs}/dogs`,
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
