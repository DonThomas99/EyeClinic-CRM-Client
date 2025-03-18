import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IloginRes, IUser, OUserLogin, OUserSignUp } from '../../models/user';
import { environments } from '../../../environments/environment';
import { Res } from '../../models/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
backendURL = environments.backendURL
  constructor(private readonly http:HttpClient) {   }
  
  userSignUp(user:OUserSignUp){
    console.log('hee')
    return this.http.post<Res>(`${this.backendURL}/user/signup`,user)
  }
  login(userData:OUserLogin){
    return this.http.post<IloginRes>(`${this.backendURL}/user/login`,userData)
  }
}
