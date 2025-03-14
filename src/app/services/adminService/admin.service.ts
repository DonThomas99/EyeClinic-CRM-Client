import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IApiRes } from '../../models/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
backendURL = environments.backendURL
  constructor(private readonly http:HttpClient) {   }


  adminLogin(email:string,password:string){
    console.log(email,password);
    return this.http.post<IApiRes>(`${this.backendURL}/admin/login`,{email,password})
  }

}
