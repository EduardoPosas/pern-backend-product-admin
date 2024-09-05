"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductId = exports.validateCreate = void 0;
const express_validator_1 = require("express-validator");
const validateCreate = (0, express_validator_1.checkSchema)({
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
});
exports.validateCreate = validateCreate;
const validateProductId = (0, express_validator_1.checkSchema)({
    id: {
        isInt: {
            errorMessage: "Parámetro no válido"
        },
    }
});
exports.validateProductId = validateProductId;
