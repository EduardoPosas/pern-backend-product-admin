import { Request, Response, NextFunction } from "express"
import { validationResult, ValidationError } from "express-validator"

const validateResult = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw()
    next()
  } catch (e: any) {
    console.log(e)
    res.status(400).json({
      errors: e.array()
    })
  }
}

export default validateResult