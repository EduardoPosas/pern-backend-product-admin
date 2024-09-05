"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_1 = __importDefault(require("./config/db"));
/** Routers */
const product_routes_1 = __importDefault(require("./products/routes/product.routes"));
/** Database */
async function dbConnection() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
        console.log("Db connection successful");
    }
    catch (error) {
        console.error(error);
        console.log("Db connection failed");
    }
}
dbConnection();
const server = (0, express_1.default)();
// Middleware
/** Routing */
// index
// Products
server.use("/products", product_routes_1.default);
exports.default = server;
