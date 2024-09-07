import express, { Request, Response } from "express"
import "dotenv/config"

/** Routers */
import products from "./products/routes/product.routes"

const server = express()

// Middleware
server.use(express.json())

/** Routing */
// index
server.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Desde index"
  })
})

// Products
server.use("/products", products)

export default server