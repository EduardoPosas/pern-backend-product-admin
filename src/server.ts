import express from "express"
import "dotenv/config"

/** Routers */
import products from "./products/routes/product.routes"

const server = express()

// Middleware

/** Routing */
// index

// Products
server.use("/products", products)

export default server