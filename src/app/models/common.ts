import { IUser } from "./user"


export interface IApiRes  {
 status:number,
 
    token:string,message:string
 
}

export interface Res {
    status:number,
    message:string
}

export interface userData{
    status:number,
    message:string,
    data:IUser
}






