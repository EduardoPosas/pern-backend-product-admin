"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateResult = (req, res, next) => {
    try {
        (0, express_validator_1.validationResult)(req).throw();
        next();
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            errors: e.array()
        });
    }
};
exports.default = validateResult;
