import express from "express"
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateAvailability,
  deleteProduct
} from "../controllers/product.controller"
import { validateProductData, validateProductId, validateProductAvailability } from "../middleware/product.validation"
import validateResult from "../../util/validation"

const router = express.Router()

router.get("/", getProducts)
router.get("/:id", validateProductId, validateResult, getProductById)
router.post("/", validateProductData, validateResult, createProduct)
router.put(
  "/:id",
  validateProductId,
  validateProductData,
  validateResult,
  updateProduct
)
router.patch(
  "/:id",
  validateProductId,
  validateProductAvailability,
  validateResult,
  updateAvailability
)
router.delete("/:id", validateProductId, validateResult, deleteProduct)

export default router