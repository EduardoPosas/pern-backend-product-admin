import { Request, Response, NextFunction } from "express";
declare const validateResult: (req: Request, res: Response, next: NextFunction) => void;
export default validateResult;
