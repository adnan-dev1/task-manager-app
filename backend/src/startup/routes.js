const express = require('express');
const task = require('../routes/task');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/task', task);
    app.use(error);
}