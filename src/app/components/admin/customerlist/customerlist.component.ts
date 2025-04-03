import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/adminService/admin.service';
import { Icustomer, ICustomerData } from '../../../models/admin';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponentComponent } from '../../common/confirmation-component/confirmation-component.component';
import { IApiRes } from '../../../models/common';
import { UserService } from '../../../services/userService/user.service';

@Component({
  selector: 'app-customerlist',
  imports: [AdminHeaderComponent, CommonModule],
  templateUrl: './customerlist.component.html',
  styleUrl: './customerlist.component.css'
})
export class CustomerlistComponent implements OnInit{
  customers!:IUser[]
  status!:string
  constructor(
   private readonly service:UserService,

   private readonly toastr:ToastrService,
   private dialog:MatDialog,

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
viewCustomer(id:string){}
toggleBlockStatus(email:string,isBlocked:boolean){
  if(isBlocked){
    this.status = "Unblock"
  }else{
    this.status = "Block"
  }
  const dialogRef = this.dialog.open(ConfirmationComponentComponent,{
    data:{title:`Are you sure you want to ${this.status} this category?`},
    width:'50%',
    height:'30%'
    })
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.service.toggleBlock(email).subscribe({
          next:(res:IApiRes)=>{
            this.toastr.success(res.message)
            this.ngOnInit()
          },
          error:(err:IApiRes)=>{
            this.toastr.error(err.message)
          }
   })
      }
    })
}
}
