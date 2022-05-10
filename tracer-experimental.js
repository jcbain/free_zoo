"use strict";

const opentelemetry = require("@opentelemetry/api");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-otlp-grpc");

const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
// const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-base");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
// const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");

// const options = {
//   tags: [], // optional
//   // You can use the default UDPSender
//   host: "http://jaeger", // optional
//   port: 6832, // optional
//   // OR you can use the HTTPSender as follows
//   endpoint: "http://jaeger:14268/api/traces",
//   maxPacketSize: 65000, // optional
// };

module.exports = (serviceName) => {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });

  //   const exporter = new ConsoleSpanExporter();
  // const exporter = new JaegerExporter(options);
  const exporter = new OTLPTraceExporter();
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

  provider.register();

  registerInstrumentations({
    instrumentations: [new getNodeAutoInstrumentations()],
  });

  return opentelemetry.trace.getTracer("awesome-example");
};
