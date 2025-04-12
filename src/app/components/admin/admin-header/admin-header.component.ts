import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  imports: [RouterModule,CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  constructor(
    private router:Router
  ){}
  dashboard(){
    this.router.navigate(['/home/admin/adminDashboard'])
  }
  optometrist(){
    this.router.navigate(['/home/admin/optometristList'])
  }
  
  customers(){
    this.router.navigate(['/home/admin/customerList'])
  }
  
  products(){
    this.router.navigate(['/home/admin/productList'])
  }
  
  orders(){
    this.router.navigate(['/home/admin/orderList'])
  }
  
  staff(){
    this.router.navigate(['/home/admin/staffList'])
  }

  logout(){
    this.router.navigate(['home'])
  }
}
