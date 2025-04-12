import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/productService/product.service';
import { IpdtRes, Iproduct, IproductRes } from '../../../models/product';

@Component({
  selector: 'app-homepage',
  imports: [HeaderComponent, FooterComponent,CommonModule,RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  products:Iproduct[]=[]
  constructor(
    private readonly productService:ProductService
  ){}
  ngOnInit(): void {
    this.productService.fetchProducts().subscribe({
      next:(res:IproductRes)=>{
        this.products = res.data
      }
    })
  }

}
