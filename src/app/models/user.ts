export interface OUserSignUp{
    email:String,
    password:String,
    name:String,
    mobile:Number
}
export interface OUserLogin{
    email:string,
    password:string
}



export interface IWalletHistory {
    transactionType: string;
    method: string;
    amount: number;
    date: Date;
}

export interface IloginRes{
status:number;
message:string;
userData:IUser;
}

export interface IUser  {
    _id: string;
    name: string;
    mobile?: string;
    email?: string;
    wallet: number;
    walletHistory: IWalletHistory[];
    isBlocked: boolean;
}
