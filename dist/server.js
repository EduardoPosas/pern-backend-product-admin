"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
/** Routers */
const product_routes_1 = __importDefault(require("./products/routes/product.routes"));
const server = (0, express_1.default)();
// Middleware
/** Routing */
// index
// Products
server.use("/products", product_routes_1.default);
exports.default = server;
