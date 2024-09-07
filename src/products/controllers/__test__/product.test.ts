import request from "supertest"
import server from "../../../server"

describe("POST /products", () => {
  it("pass product data validation", async () => {
    const response = await request(server).post("/products").send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty("errors")

    expect(response.statusCode).not.toBe(404)
    expect(response.body).not.toHaveProperty("data")

  })

  it("price grater than 0", async () => {
    const response = await request(server).post("/products").send({
      name: "Teclado mecánico 60% - testing",
      price: 0
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors[0].msg).toBe("Debe ser un valor positivo")
    expect(response.body.errors).toHaveLength(1)

    expect(response.statusCode).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(4)
  })

  it("create a new product", async () => {
    const response = await request(server).post("/products").send({
      name: "Mochila hp 15 pulgadas - testing",
      price: 25
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("data")

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty("errors")
  })
})

describe("GET /products", () => {
  it("resource must exist", async () => {
    const response = await request(server).get("/products")
    expect(response.statusCode).not.toBe(404)
  })

  it("get all products as json", async () => {
    const response = await request(server).get("/products")

    expect(response.statusCode).toBe(200)
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.body).toHaveProperty("data")

    expect(response.body).not.toHaveProperty("errors")
  })
})

describe("GET /products/:id", () => {
  it("return a 404 status code for non-existing product", async () => {
    const productId = 1000
    const response = await request(server).get(`/products/${productId}`)

    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("Producto no existe en la base de datos")
  })

  it("check an id invalid in the url", async () => {
    const response = await request(server).get("/products/no-valid-id")

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors[0].msg).toBe("Parámetro no válido")
  })

  it("get json response for a single product", async () => {
    const response = await request(server).get("/products/1")

    expect(response.statusCode).toBe(200)
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.body).toHaveProperty("data")
  })
})

describe("PUT /products/:id", () => {
  it("check for invalid id in the url", async () => {
    const response = await request(server).put("/products/not-valid-id").send({
      name: "Mochila hp 15 pulgadas - testing",
      price: 20,
      available: false
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("Parámetro no válido")
  })

  it("return a 404 status code for non-existing product ", async () => {
    const productId = 200
    const response = await request(server).put(`/products/${productId}`).send({
      name: "Mochila hp 15 pulgadas - testing",
      price: 20,
      available: false
    })

    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("Producto no existe en la base de datos")

    expect(response.statusCode).not.toBe(200)
    expect(response.body).not.toHaveProperty("data")
  })

  it("check validation to update a single product", async () => {
    const response = await request(server).put("/products/1").send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(3)

    expect(response.statusCode).not.toBe(200)
    expect(response.body).not.toHaveProperty("data")
  })

  it("price is not greater than 0", async () => {
    const response = await request(server).put("/products/1").send({
      "name": "Laptop dell 14 pulgadas 2 en 1",
      "price": 0,
      "available": false
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("Debe ser un valor positivo")

    expect(response.statusCode).not.toBe(200)
    expect(response.body).not.toHaveProperty("msg")
  })

  it("update a single product with valid data", async () => {
    const response = await request(server).put("/products/1").send({
      "name": "Laptop dell 14 pulgadas 2 en 1",
      "price": 20,
      "available": false
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("data")
    expect(response.body.data).toBeTruthy()

    expect(response.statusCode).not.toBe(400)
    expect(response.body).not.toHaveProperty("errors")
  })
})

describe("PATCH /products/:id", () => {
  it("check for invalid url", async () => {
    const response = await request(server).patch("/products/not-valid-url").send({
      available: true
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("Parámetro no válido")
  })

  it("validate availability", async () => {
    const response = await request(server).patch("/products/1").send({})

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors[0].msg).toBe("Parámetro no válido")
  })

  it("return a 404 status code fon non-existing product", async () => {
    const productId = 200
    const response = await request(server).delete(`/products/${productId}`).send({
      available: true
    })

    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("Producto no existe en la base de datos")

    expect(response.statusCode).not.toBe(200)
    expect(response.statusCode).not.toBe(400)
  })

  it("update availability of a product", async () => {
    const response = await request(server).patch("/products/1").send({
      available: false
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("data")

    expect(response.statusCode).not.toBe(400)
    expect(response.statusCode).not.toBe(404)
    expect(response.body).not.toHaveProperty("errors")
    expect(response.body).not.toHaveProperty("error")
  })
})

describe("DELETE /products/:id", () => {
  it("check for invalid url id when deleting", async () => {
    const response = await request(server).delete("/products/not-valid-url")

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("Parámetro no válido")
  })

  it("check for non existing product in db when deleting", async () => {
    const productId = 200
    const response = await request(server).delete(`/products/${productId}`)

    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("Producto no existe en la base de datos")
  })

  it("should delete a product by id successfully", async () => {
    const response = await request(server).delete("/products/1")

    expect(response.statusCode).toBe(204)
  })
})