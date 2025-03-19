import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/adminService/admin.service';
import { Icustomer, ICustomerData } from '../../../models/admin';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../../models/user';

@Component({
  selector: 'app-customerlist',
  imports: [AdminHeaderComponent, CommonModule],
  templateUrl: './customerlist.component.html',
  styleUrl: './customerlist.component.css'
})
export class CustomerlistComponent implements OnInit{
  customers!:IUser[]
  constructor(
   private readonly service:AdminService,
   private readonly toastr:ToastrService
  ){}
  ngOnInit(): void {
    this.service.fetchCustomerData().subscribe({
      next:(res:ICustomerData)=>{
this.customers = res.customers
      },
      error:(res:Icustomer)=>{

      }
    })
  }
viewCustomer(id:string){

}

}
