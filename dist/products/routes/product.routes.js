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
router.get("/", (_req, res) => {
    res.send("From products...");
});
router.post("/", product_validation_1.validateCreate, validation_1.default, product_controller_1.createProduct);
router.put("/", () => { });
router.delete("/", () => { });
exports.default = router;
