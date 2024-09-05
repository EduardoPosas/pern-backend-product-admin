import { Model } from "sequelize-typescript";
export declare class Product extends Model {
    name: string;
    price: number;
    available: boolean;
    constructor(name: string, price: number, available: boolean);
}
