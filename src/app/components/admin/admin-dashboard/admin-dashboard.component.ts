import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminHeaderComponent,RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(
    private router:Router
  ){

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

}
