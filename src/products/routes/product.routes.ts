import express, { Request, Response } from "express"

const router = express.Router()

router.get("/", (_req: Request, res: Response) => {
  res.send("From products...")
})
router.post("/", () => { })
router.put("/", () => { })
router.delete("/", () => { })

export default router