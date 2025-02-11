const express = require("express");
const simulateLatency = require("./utils/latency");
const generateRandomError = require("./utils/error");
const app = express();
const port = 3000;
const client = require("prom-client");
const responseTime = require("response-time");

const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  transports: [
    new LokiTransport({
      labels: {
        appName: "express",
      },
      host: "http://127.0.0.1:3100",
    }),
  ],
};
const logger = createLogger(options);

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

// request response time
const reqResTime = new client.Histogram({
  name: "http_test_express_req_res_time",
  help: "This tells how much time is taken by req and res",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000, 5000, 10000],
});

register.registerMetric(reqResTime);

// req counter
const totalReqCounter = new client.Counter({
  name: "total_req",
  help: "Tells total request",
});

register.registerMetric(totalReqCounter);

// setting up custom metrics
app.use(
  responseTime((req, res, time) => {
    totalReqCounter.inc();
    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  })
);

app.get("/", (req, res) => {
  logger.info("request from /");
  return res.status(200).json({ message: "normal response" });
});

app.get("/test", (req, res) => {
  logger.info("request from /test");
  fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        return res.status(200).json({ message: "API request" , data: json });
      })
});

// Route to simulate high latency and random errors
app.get("/slow-query", async (req, res) => {
  await simulateLatency();
  const data = await generateRandomError();
  if (data.type === "success") {
    logger.info("request from /slow");
    const { successResponse } = data;
    return res
      .status(successResponse.status)
      .json({ message: successResponse.message });
  } else if (data.type === "error") {
    const { errorResponse } = data;
    logger.error(data.errorResponse.message);
    return res
      .status(errorResponse.status)
      .json({ message: errorResponse.message });
  }
});

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  const metrics = await register.metrics();
  return res.send(metrics);
});

app.listen(port, () => console.log(`Application running on port ${port}`));
