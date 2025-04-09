export interface IBrand{
    _id:string,
    name:string,
    isBlocked:boolean
    }
    
    export interface AddBrandRes{
        status:number;
        message:string;
        data:IBrand;
    }
    
    export interface OAddBrand{
    BrandName:string
    }
    
    export interface brandRes{
        status:number;
        message:string;
        data:IBrand[]
    }