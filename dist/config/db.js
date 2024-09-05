"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const db = new sequelize_typescript_1.Sequelize(process.env.DEV_DB_DATABASE, process.env.DEV_DB_USERNAME, process.env.DEV_DB_PASSWORD, {
    host: process.env.DEV_DB_HOST,
    dialect: "postgres",
    // ssl: false,
    models: [__dirname + "../products/models/**/*.ts"]
});
exports.default = db;
