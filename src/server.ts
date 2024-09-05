import express from "express"
import "dotenv/config"

/** Routers */
import products from "./products/routes/product.routes"

const server = express()

// Middleware
server.use(express.json())

/** Routing */
// index

// Products
server.use("/products", products)

export default server