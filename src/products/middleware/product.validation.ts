import { checkSchema } from "express-validator"

const validateProductData = checkSchema({
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Campo requerido"
    }
  },
  price: {
    isNumeric: {
      errorMessage: "Debe ser un valor numérico"
    },
    custom: {
      options: (value) => value > 0,
      errorMessage: "Debe ser un valor positivo"
    }
  },
  available: {
    optional: true,
    isBoolean: {
      errorMessage: "Valor erróneo"
    },
  }
})

const validateProductId = checkSchema({
  id: {
    isInt: {
      errorMessage: "Parámetro no válido"
    },
  }
})

const validateProductAvailability = checkSchema({
  available: {
    isBoolean: {
      errorMessage: "Parámetro no válido"
    }
  }
})

export {
  validateProductData,
  validateProductId,
  validateProductAvailability
}