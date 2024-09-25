import express, { Request, Response } from "express"
import "dotenv/config"
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import swaggerSpec, { swaggerUiOptions } from "./config/swagger"

/** Routers */
import products from "./products/routes/product.routes"

const server = express()

// Middleware
const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_ORIGIN_URL,
  optionsSuccessStatus: 200
}
server.use(cors(corsOptions))
server.use(express.json())
server.use(morgan("combined"))

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