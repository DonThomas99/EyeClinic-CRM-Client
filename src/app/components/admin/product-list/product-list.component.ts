import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { Iproduct } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [AdminHeaderComponent,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products!:Iproduct[]
  constructor(private readonly router:Router ){}
  ngOnInit(): void {}
  viewCategories(){
  this.router.navigate(['/home/admin/categoryList'])
  }
  addProduct(){}
  editProduct(id:string){}

}
