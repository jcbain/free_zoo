const tracer = require("../tracer-experimental")("dogs");

const express = require("express");
const axios = require("axios");

// const observer = require("../observer");

// try {
//   observer("dogs");
// } catch (e) {
//   console.error(`observer not running\n`, e);
// }

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
  sayHello();
  const span = tracer.startSpan("dogs:Timeout()");
  setTimeout(() => {
    res.json(["pippa", "prairie", "chewbacca"]);
  }, 2000);
  span.end();
});

// response should take 3 seconds
app.get("/idk", (req, res) => {
  axios.get("http://cats:8888/cats").then((cats) => {
    setTimeout(() => {
      res.json(cats.data);
    }, 3000);
  });
});

app.get("/rand", async (req, res) => {
  const animals = await axios.get("http://random:7777/");

  setTimeout(() => {
    res.json(animals.data);
  }, 5000);
});

process.on("SIGINT", function onSigint() {
  console.info("Received SIGINT.");
  process.exit(130); // Or applicable exit code depending on OS and signal
});

app.listen(PORT, () => console.log(`🐶 on port ${PORT}`));
