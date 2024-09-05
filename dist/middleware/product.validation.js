"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreate = void 0;
const express_validator_1 = require("express-validator");
const validation_1 = __importDefault(require("../util/validation"));
const validateCreate = [
    (0, express_validator_1.checkSchema)({
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
                options: (value) => value > 0
            }
        }
    }),
    (req, res, next) => {
        (0, validation_1.default)(req, res, next);
    }
];
exports.validateCreate = validateCreate;
