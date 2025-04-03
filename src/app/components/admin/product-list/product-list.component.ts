import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { Iproduct } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/adminService/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponentComponent } from '../../common/confirmation-component/confirmation-component.component';
import { IApiRes } from '../../../models/common';

@Component({
  selector: 'app-product-list',
  imports: [AdminHeaderComponent,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products!:Iproduct[]
  status!:String

  constructor(private readonly router:Router,
    private readonly service:AdminService,
    private dialog:MatDialog,
    private toastr: ToastrService,

   ){}
  ngOnInit(): void {}
  viewCategories(){
  this.router.navigate(['/home/admin/categoryList'])
  }
  addProduct(){}
  editProduct(id:string){}
    toggleBlockStatus(productId:string,isBlocked:boolean){
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
            // this.service.toggleBlock(productId).subscribe({
            //   next:(res:IApiRes)=>{
            //     this.toastr.success(res.message)
            //     this.ngOnInit()
            //   },
            //   error:(err:IApiRes)=>{
            //     this.toastr.error(err.message)
            //   }
            // })
          }
        })
    }
}
