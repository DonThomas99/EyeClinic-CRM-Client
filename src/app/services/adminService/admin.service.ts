import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IApiRes } from '../../models/common';
import { Icustomer, ICustomerData } from '../../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
backendURL = environments.backendURL
  constructor(private readonly http:HttpClient) {   }


  adminLogin(email:string,password:string){
    return this.http.post<IApiRes>(`${this.backendURL}/admin/login`,{email,password})
  }
  fetchCustomerData(){
    return this.http.get<ICustomerData>(`${this.backendURL}/admin/customers`)
  }

}
