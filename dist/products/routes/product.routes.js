"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const product_validation_1 = require("../middleware/product.validation");
const validation_1 = __importDefault(require("../../util/validation"));
const router = express_1.default.Router();
router.get("/", product_controller_1.getProducts);
router.get("/:id", product_validation_1.validateProductId, validation_1.default, product_controller_1.getProductById);
router.post("/", product_validation_1.validateProductData, validation_1.default, product_controller_1.createProduct);
router.put("/:id", product_validation_1.validateProductId, product_validation_1.validateProductData, validation_1.default, product_controller_1.updateProduct);
router.patch("/:id", product_validation_1.validateProductId, product_validation_1.validateProductAvailability, validation_1.default, product_controller_1.updateAvailability);
router.delete("/:id", product_validation_1.validateProductId, validation_1.default, product_controller_1.deleteProduct);
exports.default = router;
