import express, { Request, Response } from "express"
import { createProduct } from "../controllers/product.controller"
import { validateCreate } from "../middleware/product.validation"
import validateResult from "../../util/validation"

const router = express.Router()

router.get("/", (_req: Request, res: Response) => {
  res.send("From products...")
})
router.post("/", validateCreate, validateResult, createProduct)
router.put("/", () => { })
router.delete("/", () => { })

export default router