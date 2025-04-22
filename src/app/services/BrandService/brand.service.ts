import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environment';
import { AddBrandRes, brandRes, OAddBrand } from '../../models/brand';
import { IApiRes } from '../../models/common';
import { OCategory } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private readonly http:HttpClient) { }
  backendURL = environments.backendURL
  fetchBrandList(){
    return this.http.get<brandRes>(`${this.backendURL}/admin/brand`)
  }
  
  addBrand(brand:OAddBrand){
    return this.http.post<AddBrandRes>(`${this.backendURL}/admin/brand`,brand)
  }

  toggleBlock(brandId:string){
    return this.http.put<IApiRes>(`${this.backendURL}/admin/brand`,{brandId})
  }
  updateBrand(brandId:string,brandData:Partial<OCategory>){
    return this.http.patch<IApiRes>(`${this.backendURL}/admin/brand`,{brandId,brandData})
  }
}

