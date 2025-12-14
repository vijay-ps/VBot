const express = require("express");
require("dotenv").config();
const logger = require("./utils/logger");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
require("./bot");
