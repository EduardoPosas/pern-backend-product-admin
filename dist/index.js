"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
// Listen to the server
server_1.default.listen(process.env.DEV_PORT, () => {
    console.log(`Server running on port: http://localhost:${process.env.DEV_PORT}`);
});
