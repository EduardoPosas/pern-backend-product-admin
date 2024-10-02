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

/**
 * @swagger
 *  components:
 *    schemas:
 *      Product:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: Product id
 *            example: 1
 *          name:
 *            type: string
 *            description: Product name
 *            example: Teclado mecánico 65%
 *          price:
 *            type: number
 *            description: Product price
 *            example: 10
 *          available:
 *            type: boolean
 *            description: Product availability
 *            example: true
 *        # name and price are required
 *        required:
 *          - name
 *          - price
 *      Error:
 *        type: object
 *        properties:
 *          type:
 *            type: string
 *            description: Type of the error
 *            example: field
 *          value:
 *            type: string
 *            description: The wrong passed parameter
 *            example: hola
 *          msg:
 *            type: string
 *            description: The error message
 *            example: Parámetro no válido
 *          path:
 *            type: string
 *            description: The label of the parameter
 *            example: id
 *          location:
 *            type: string
 *            description: The type of parameter
 *            example: params            
 */

/**
 * @swagger
 * /products:
 *  get:
 *    summary: Get all products
 *    description: Find all products available in the database
 *    # For grouping in certain tag
 *    tags:
 *      - Products
 *    responses:
 *      "200":
 *        description: Return a JSON array of products
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/Product"
 */
router.get("/", getProducts)

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    summary: Find a product by id
 *    description: Find a specific product in the database
 *    tags:
 *      - Products
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The id of the product to retrieve
 *        schema:
 *          type: integer
 *          minimum: 1
 *    responses:
 *      "200":
 *        description: Return a JSON response with a specific product
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: "#/components/schemas/Product"
 *      "400":
 *        description: Invalid parameter
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/Error"
 *      "404":
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Producto no existe en la base de datos         
 */
router.get("/:id", validateProductId, validateResult, getProductById)

/**
 * @swagger
 * /products:
 *  post:
 *    summary: Creates a new products
 *    description: Create a new product available
 *    tags:
 *      - Products
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Laptop Dell 14 pulgadas 2 in 1
 *              price:
 *                type: number
 *                example: 1000
 *    responses:
 *      "201":
 *        description: Creates a new product and return it as JSON
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: "#/components/schemas/Product"
 *      "400":
 *        description: Bad request - invalid input data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/Error"                    
 */
router.post("/", validateProductData, validateResult, createProduct)

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    summary: Update data of an existing product
 *    description: Return a JSON response with the updated product
 *    tags:
 *      - Products
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The id of the product to update
 *        schema:
 *          type: integer
 *          minimum: 1
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Laptop Dell 14 pulgadas 2 in 1 - updated
 *              price:
 *                type: number
 *                example: 1000
 *              available:
 *                type: boolean
 *                example: true
 *    responses:
 *      "200":
 *        description: Return a JSON response with the updated product
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: "#/components/schemas/Product"
 *      "400":
 *        description: Bad request - invalid parameter or invalid data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/Error"
 *      "404":
 *        description: Product not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Producto no existe en la base de datos
 */
router.put(
  "/:id",
  validateProductId,
  validateProductData,
  validateResult,
  updateProduct
)

/**
 * @swagger
 * /products/{id}:
 *  patch:
 *    summary: Update availability of an existing product
 *    description: Return the updated product as a JSON
 *    tags:
 *      - Products
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The id of the product to update
 *        schema:
 *          type: integer
 *          minimum: 1
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              available:
 *                type: boolean
 *                example: true
 *    responses:
 *      "200":
 *        description: Return a JSON response with the updated product
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: "#/components/schemas/Product"
 *      "400":
 *        description: Bad request - invalid parameter or invalid data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/Error"
 *      "404":
 *        description: Product not found - invalid id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Producto no existe en la base de datos
 */
router.patch(
  "/:id",
  validateProductId,
  // validateProductAvailability,
  validateResult,
  updateAvailability
)

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    summary: Delete a product by id
 *    description: Delete a product from the database
 *    tags:
 *      - Products
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The id of the product to delete
 *        schema:
 *          type: integer
 *          minimum: 1
 *    responses:
 *      "204":
 *        description: Product deleted - no content returned
 *      "400":
 *        description: Bad request - invalid parameter
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/Error"
 *      "404":
 *        description: Product not found - invalid id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Producto no existe en la base de datos 
 */
router.delete("/:id", validateProductId, validateResult, deleteProduct)

export default router