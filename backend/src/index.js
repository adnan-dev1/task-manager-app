const winston = require('winston');
const express = require('express');
const dotenv = require("dotenv");
const app = express();

dotenv.config();
require("./startup/logging")();
require("./startup/cors")(app);
require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    winston.info(`Listening on port ${port}`)
});

module.exports = server;