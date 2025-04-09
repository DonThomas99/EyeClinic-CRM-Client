import { Component, OnInit, Inject } from '@angular/core';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../services/BrandService/brand.service';
import { AddBrandRes, brandRes, IBrand } from '../../../models/brand';
import { IApiRes } from '../../../models/common';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponentComponent } from '../../common/confirmation-component/confirmation-component.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-brand-list',
  imports: [AdminHeaderComponent,RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent implements OnInit{
  brands!:IBrand[]
  status!:String
  constructor(
    private readonly router:Router,
    @Inject(FormBuilder) private readonly formBuilder:FormBuilder,
    private toastr:ToastrService,
    private readonly service:BrandService,
    private dialog:MatDialog
  ){}
  addBrandForm!:FormGroup
  ngOnInit(){
    this.addBrandForm = this.formBuilder.group({
      brandName:['',[Validators.required,Validators.minLength(3)]]
    })

    this.service.fetchBrandList().subscribe({
      next:(res:brandRes)=>{
        this.brands = res.data
      }
    })

  }
  
  addBrand(){
    if(this.addBrandForm.valid){
      const values = this.addBrandForm.getRawValue()
      this.service.addBrand(values).subscribe({
        next:(res:AddBrandRes)=>{
            this.brands.push(res.data)
        this.toastr.success(res.message)
        },
        error:(err:IApiRes)=>{
          console.log(err);
        }
      })
    }
  }

    toggleBlockStatus(categoryId:string,isBlocked:boolean){
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
            this.service.toggleBlock(categoryId).subscribe({
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

    editBrand(brandId:string){

    }
  
}
