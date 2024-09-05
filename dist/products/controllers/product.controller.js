"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const client_1 = __importDefault(require("../../database/client"));
const createProduct = async (req, res) => {
    const { name, price } = req.body;
    // console.log(name, price)
    try {
        // create user from body data
        const user = await client_1.default.product.create({
            data: {
                name,
                price
            }
        });
        // console.log(user)
        return res.status(201).json({
            data: user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error al crear producto"
        });
    }
};
exports.createProduct = createProduct;
