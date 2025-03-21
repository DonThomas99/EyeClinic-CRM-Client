import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { Iproduct } from '../../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [AdminHeaderComponent,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products!:Iproduct[]
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  viewCategories(){}
  addProduct(){}
  editProduct(id:string){}

}
