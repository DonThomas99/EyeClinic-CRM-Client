export interface Iproduct{
_id: string;
name: string;
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