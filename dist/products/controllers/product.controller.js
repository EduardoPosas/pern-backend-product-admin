"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateAvailability = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const client_1 = __importDefault(require("../../database/client"));
const getProducts = async (_req, res) => {
    try {
        const products = await client_1.default.product.findMany({
            select: {
                id: true,
                name: true,
                price: true
            },
            // take: 2
        });
        res.status(200).json({
            data: products
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al consultar productos"
        });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    const id = +req.params.id;
    try {
        const product = await client_1.default.product.findUnique({
            where: {
                id
            }
        });
        // console.log(product)
        if (!product) {
            return res.status(404).json({
                error: "Producto no existe en la base de datos"
            });
        }
        res.status(200).json({
            data: product
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al consultar producto"
        });
    }
};
exports.getProductById = getProductById;
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
const updateProduct = async (req, res) => {
    const id = +req.params.id;
    const { name, price, available } = req.body;
    try {
        const existingProduct = await client_1.default.product.findUnique({
            where: {
                id
            }
        });
        if (!existingProduct) {
            return res.status(404).json({
                error: "Producto no existe en la base de datos"
            });
        }
        // update product data
        const updatedProduct = await client_1.default.product.update({
            where: {
                id
            },
            data: {
                name,
                price,
                available
            }
        });
        res.status(200).json({
            data: updatedProduct
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al actualizar los datos del producto"
        });
    }
};
exports.updateProduct = updateProduct;
const updateAvailability = async (req, res) => {
    const id = +req.params.id;
    const { available } = req.body;
    try {
        const existingProduct = await client_1.default.product.findUnique({
            where: {
                id
            }
        });
        if (!existingProduct) {
            return res.status(404).json({
                error: "Producto no existe en la base de datos"
            });
        }
        // update product data
        const updatedProduct = await client_1.default.product.update({
            where: {
                id
            },
            data: {
                available
            }
        });
        res.status(200).json({
            data: updatedProduct
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al actualizar la disponibilidad del producto"
        });
    }
};
exports.updateAvailability = updateAvailability;
const deleteProduct = async (req, res) => {
    const id = +req.params.id;
    try {
        const existingProduct = await client_1.default.product.findUnique({
            where: {
                id
            }
        });
        if (!existingProduct) {
            return res.status(404).json({
                error: "Producto no existe en la base de datos"
            });
        }
        const deletedProduct = await client_1.default.product.delete({
            where: {
                id
            }
        });
        res.status(204).json({
            data: "Producto eliminado correctamente"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al eliminar producto"
        });
    }
};
exports.deleteProduct = deleteProduct;
