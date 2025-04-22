export interface Icategory{
_id:string,
name:string,
isBlocked:boolean
}

export interface AddCategoryRes{
    status:number;
    message:string;
    data:Icategory;
}

export interface OAddCategory{
categoryName:string
}

export interface OCategory{
    name:string;
}

export interface categoryRes{
    status:number;
    message:string;
    data:Icategory[]
}