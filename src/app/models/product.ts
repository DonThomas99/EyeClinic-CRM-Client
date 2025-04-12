export interface Iproduct{
_id: string;
name: string;
category: {
    _id:string,
    name:string
}; // Reference to Category model
images: string[]; // Array of image URLs
brand: {
    _id:string,
    name:string
}
price: number;
stock: number;
description: string;
isBlocked:boolean
createdAt: Date;
updatedAt: Date;
}

export interface IproductRes{
    status:number,
    message:string,
    data:Iproduct[]
}

export interface IpdtRes{
    status:number,
    message:string,
    data:Iproduct
}

export interface Oproduct{
    category: string; // Reference to Category model
images: string[]; // Array of image URLs
brand: string;
price: number;
stock: number;
description: string;
isBlocked:boolean
createdAt: Date;
updatedAt: Date;
}