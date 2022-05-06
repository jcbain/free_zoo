const process = require("process");
// const { default: agent } = require("skywalking-backend-js");
const agent = require("skywalking-agent-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");

const instrumentations = getNodeAutoInstrumentations();

module.exports = (serviceName) => {
  agent.start({
    serviceName: `toy-express::${serviceName}`,
    serviceInstance: `${serviceName}`,
    collectorAddress: process.env.COLLECTOR_ADR,
    instrumentations,
    // disablePlugins: "mongodb",
  });
};
