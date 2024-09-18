import express, { Request, Response } from "express"
import "dotenv/config"
import swaggerUi from "swagger-ui-express"
import swaggerSpec, { swaggerUiOptions } from "./config/swagger"

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

// Documentation
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server