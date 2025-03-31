import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IApiRes } from '../../models/common';
import { Icustomer, ICustomerData } from '../../models/admin';
import { AddCategoryRes, categoryRes, OAddCategory } from '../../models/category';

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

  fetchCategoryList(){
    return this.http.get<categoryRes>(`${this.backendURL}/admin/category`)
  }
  addCategory(category:OAddCategory){
    console.log(category);
    return this.http.post<AddCategoryRes>(`${this.backendURL}/admin/category`,category)
  }

  toggleBlock(categoryId:string){
    
    return this.http.put<IApiRes>(`${this.backendURL}/admin/category`,{categoryId})
  }

}
