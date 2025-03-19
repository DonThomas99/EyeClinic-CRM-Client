export interface ICustomerData{
status:number;
message:string;
customers:Icustomer[];
}

export interface IWalletHistory {
    transactionType: string;
    method: string;
    amount: number;
    date: Date;
}

export interface Icustomer  {
    _id: string;
    name: string;
    mobile: string;
    email: string;
    wallet: number;
    walletHistory: IWalletHistory[];
    isBlocked: boolean;
}