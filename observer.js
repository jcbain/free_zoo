const process = require("process");
const { default: agent } = require("skywalking-backend-js");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");

module.exports = (serviceName) => {
  agent.start({
    serviceName: `toy-express::${serviceName}`,
    serviceInstance: `${serviceName}`,
    collectorAddress: process.env.COLLECTOR_ADR,
    instrumentations: [getNodeAutoInstrumentations()],
  });
};
