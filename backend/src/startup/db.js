const winston = require('winston');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
module.exports = function() {
    const db = process.env.MONGO_URL + '/taskManager';
    mongoose.connect(db).then(() => {
        winston.info(`Connected to ${db} ....`);
    })
}