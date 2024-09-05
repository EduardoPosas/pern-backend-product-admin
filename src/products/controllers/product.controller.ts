import { Request, RequestHandler, Response } from "express"
import prisma from "../../database/client"

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true
      },
      // take: 2
    })
    res.status(200).json({
      data: products
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Error al consultar productos"
    })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  const id = +req.params.id
  try {
    const product = await prisma.product.findUnique({
      where: {
        id
      }
    })
    // console.log(product)
    if (!product) {
      return res.status(404).json({
        error: "Producto no existe en la base de datos"
      })
    }
    res.status(200).json({
      data: product
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Error al consultar producto"
    })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body

  // console.log(name, price)

  try {
    // create user from body data
    const user = await prisma.product.create({
      data: {
        name,
        price
      }
    })

    // console.log(user)
    return res.status(201).json({
      data: user
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Error al crear producto"
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const id = +req.params.id
  const { name, price, available } = req.body

  try {
    const existingProduct = await prisma.product.findUnique({
      where: {
        id
      }
    })
    if (!existingProduct) {
      return res.status(404).json({
        error: "Producto no existe en la base de datos"
      })
    }

    // update product data
    const updatedProduct = await prisma.product.update({
      where: {
        id
      },
      data: {
        name,
        price,
        available
      }
    })
    res.status(200).json({
      data: updatedProduct
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Error al actualizar los datos del producto"
    })
  }
}

export const updateAvailability = async (req: Request, res: Response) => {
  const id = +req.params.id
  const { available } = req.body

  try {
    const existingProduct = await prisma.product.findUnique({
      where: {
        id
      }
    })
    if (!existingProduct) {
      return res.status(404).json({
        error: "Producto no existe en la base de datos"
      })
    }

    // update product data
    const updatedProduct = await prisma.product.update({
      where: {
        id
      },
      data: {
        available
      }
    })
    res.status(200).json({
      data: updatedProduct
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Error al actualizar la disponibilidad del producto"
    })
  }
} 