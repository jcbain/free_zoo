const tracer = require("../tracer-experimental")("dogs");

const express = require("express");
const axios = require("axios");

const { getHosts } = require("../helpers/helpers");

const hosts = getHosts();

const app = express();
const PORT = 9999;

const sayHello = async () => {
  console.log("hello");
};

app.get("/", (req, res) => {
  res.redirect("/dogs");
});

// this should take 2 seconds
app.get("/dogs", (req, res) => {
  const span = tracer.startSpan("dogs:Timeout()");
  sayHello();
  span.end();

  setTimeout(() => {
    res.json(["pippa", "prairie", "chewbacca"]);
  }, 2000);
});

// response should take 3 seconds
app.get("/idk", (req, res) => {
  axios.get(`${hosts.cats}/cats`).then((cats) => {
    setTimeout(() => {
      res.json(cats.data);
    }, 3000);
  });
});

app.get("/rand", async (req, res) => {
  const animals = await axios.get(`${hosts.rand}/`);

  setTimeout(() => {
    res.json(animals.data);
  }, 5000);
});

app.listen(PORT, () => console.log(`🐶 on port ${PORT}`));
