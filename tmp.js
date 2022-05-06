const { tracer } = require("./instrumentation-setup");

const sayHello = () => console.log("hello");

const parentSpan = tracer.startSpan("main");
sayHello();
parentSpan.end();
