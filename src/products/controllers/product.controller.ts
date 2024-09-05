import { Request, Response } from "express"
import prisma from "../../database/client"

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