const oracleDB = require('oracledb');
const dbConfig = require('../config/database.js');

async function initialize() {
    const pool = await oracleDB.createPool(dbConfig.hrPool);
};

module.exports.initialize = initialize;