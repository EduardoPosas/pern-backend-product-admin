import { NextFunction, Request, Response } from "express";
declare const validateCreate: (import("express-validator/lib/middlewares/schema").RunnableValidationChains<import("express-validator").ValidationChain> | ((req: Request, res: Response, next: NextFunction) => void))[];
export { validateCreate };
