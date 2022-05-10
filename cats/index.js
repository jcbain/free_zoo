const tracer = require("../tracer-experimental")("cats");

const express = require("express");
const axios = require("axios");

const { sleep, getHosts } = require("../helpers/helpers");

const hosts = getHosts();

const app = express();
const PORT = 8888;

app.get("/", (req, res) => {
  res.redirect("/cats");
});

app.get("/cats", async (req, res) => {
  // const span = tracer.startSpan("cats:sleep(5000)");
  await sleep(5000);
  // span.end();

  setTimeout(() => {
    res.json(["sed", "gus", "sybil"]);
  }, 2000);
});

app.get("/idk", async (req, res) => {
  const dogs = await axios.get(`${hosts.dogs}/dogs`);

  setTimeout(() => {
    res.json(dogs.data);
  }, 3000);
});

app.get("/rand", async (req, res) => {
  const animals = await axios.get(`${hosts.rand}/`);

  setTimeout(() => {
    res.json(animals.data);
  }, 5000);
});

app.listen(PORT, () => console.log(`🐱 on port ${PORT}`));
