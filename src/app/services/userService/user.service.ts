import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IloginRes, IUser, OUserLogin, OUserSignUp } from '../../models/user';
import { environments } from '../../../environments/environment';
import { IApiRes, Res } from '../../models/common';
import { ICustomerData } from '../../models/admin';

@Injectable({
  providedIn: 'root'
})
export class UserService {
backendURL = environments.backendURL
  constructor(private readonly http:HttpClient) {}
  
  userSignUp(user:OUserSignUp){
    return this.http.post<Res>(`${this.backendURL}/user/signup`,user)
  }
  login(userData:OUserLogin){
    return this.http.post<IloginRes>(`${this.backendURL}/user/login`,userData)
  }

  toggleBlock(userEmail:string){
    return this.http.put<IApiRes>(`${this.backendURL}/admin/customers`,{userEmail})
  }

  fetchCustomerData(){
    return this.http.get<ICustomerData>(`${this.backendURL}/admin/customers`)
  }
}
