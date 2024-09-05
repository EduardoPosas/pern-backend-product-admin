import express, { Request, Response } from "express"
import { createProduct, getProducts, getProductById } from "../controllers/product.controller"
import { validateCreate, validateProductId } from "../middleware/product.validation"
import validateResult from "../../util/validation"

const router = express.Router()

router.get("/", getProducts)
router.get("/:id", validateProductId, validateResult, getProductById)
router.post("/", validateCreate, validateResult, createProduct)
router.put("/", () => { })
router.delete("/", () => { })

export default router