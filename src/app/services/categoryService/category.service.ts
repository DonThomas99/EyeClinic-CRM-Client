import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRes, categoryRes, OAddCategory } from '../../models/category';
import { IApiRes } from '../../models/common';
import { environments } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly http:HttpClient) {   }
  backendURL = environments.backendURL
  
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
