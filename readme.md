# PERN - TypeScript - Administrador de productos

REST API para administrar productos.

## Tecnologías

* Node
* Express
* TypeScript
* Sequelize


## Dependencias

### Desarrollo

* nodemon
* ts-node
* typescript (tsc para compilar ts a js)
* prisma

### Producción

* express
* express and node types
* prisma client

## Comandos útiles

```cmd
tsc -w
nodemon dist/index.js
```

## Prisma

Se utiliza prisma para gestionar las migraciones de los modelos a la base de datos, algunos comandos útlies son:

```cmd
npx prisma init
npx prisma migrate dev --name init
npx prisma studio
```

## Endpoints

* GET: /products to get list of products
* GET: /products/1 to get a specific product
* POST: /products to create a new product
* PUT: /products/1 to update the whole product entity
* PATCH: /products/1 to update just the product availability
* DELETE: /products/1 to delete a product

## Testing

Se utiliza jest para crear los test unitarios y supertest para hacer las peticiones al servidor y probar la integración del código.

```cli
npx ts-jest config:init
npm test
npm run test:coverage
```

Code coverage:

--------------------------|---------|----------|---------|---------|-----------------------------------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------------|---------|----------|---------|---------|-----------------------------------------------
All files                 |      87 |       75 |     100 |   86.17 |                                               
 src                      |     100 |      100 |     100 |     100 |                                               
  server.ts               |     100 |      100 |     100 |     100 |                                               
 src/database             |     100 |      100 |     100 |     100 |                                               
  client.ts               |     100 |      100 |     100 |     100 |                                               
 src/products/controllers |   78.68 |       75 |     100 |   76.36 | 
  product.controller.ts   |   78.68 |       75 |     100 |   76.36 | 18-19,43-44,69-70,107-108,125,143-144,172-173
 src/products/middleware  |     100 |      100 |     100 |     100 | 
  product.validation.ts   |     100 |      100 |     100 |     100 | 
 src/products/routes      |     100 |      100 |     100 |     100 | 
  product.routes.ts       |     100 |      100 |     100 |     100 | 
 src/util                 |     100 |      100 |     100 |     100 | 
  validation.ts           |     100 |      100 |     100 |     100 | 
--------------------------|---------|----------|---------|---------|-----------------------------------------------

## API - Documentación

Se utilizó `swagger-jsdoc` y `swagger-ui-express` para documentar la api.

```ts
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
```