const process = require("process");
const { NodeSDK } = require("@opentelemetry/sdk-node");
const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-base");
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const traceExporter = new ConsoleSpanExporter();
const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk
  .start()
  .then(() => console.log("🖋 tracing started"))
  .catch((error) => console.log("Error initializing tracing\n", error));

process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => console.log("✋ tracing stopped"))
    .catch((error) => console.log("Error stopping tracing\n", error))
    .finally(() => process.exit(0));
});
