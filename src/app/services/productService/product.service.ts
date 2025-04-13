import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environment';
import { IpdtRes, Iproduct, IproductRes } from '../../models/product';
import { IApiRes } from '../../models/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http:HttpClient) {
  }
  backendURL = environments.backendURL

  fetchProducts(){
    return this.http.get<IproductRes>(`${this.backendURL}/product/product`)
  }

  addProduct(product:FormData){
    return this.http.post<IpdtRes>(`${this.backendURL}/product/product`,product)
  }

  toggleBlock(productId:String){
    return this.http.put<IApiRes>(`${this.backendURL}/product/product`,{productId})
  }
}
