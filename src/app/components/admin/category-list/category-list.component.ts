import { Component, ElementRef, Inject, NgModule, OnInit, viewChild } from '@angular/core';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { AddCategoryRes, categoryRes, Icategory } from '../../../models/category';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { AdminService } from '../../../services/adminService/admin.service';
import { IApiRes } from '../../../models/common';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponentComponent } from '../../common/confirmation-component/confirmation-component.component';
import { CategoryService } from '../../../services/categoryService/category.service';
import { UpdateCategoryBrandComponent } from '../../common/update-category-brand/update-category-brand.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category-list',
  imports: [AdminHeaderComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  addCategoryForm!:FormGroup;  
  categories!:Icategory[];
  status!:String

  addModal = viewChild<ElementRef>('addModal');
  blockToggleModal = viewChild<ElementRef>('blockToggleModal');


  constructor(private readonly router:Router,
        @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
        private readonly service:CategoryService,
        private toastr: ToastrService,
        private dialog:MatDialog,

  ){

  }
  ngOnInit() {
    this.addCategoryForm = this.formBuilder.group({
      categoryName:['',[Validators.required, Validators.minLength(3)]]
    })
    this.service.fetchCategoryList().subscribe({
      next:(res:categoryRes)=>{
        this.categories = res.data
      }
    })
  }
  editCategory(categoryId:string){
  const dialogRef = this.dialog.open(UpdateCategoryBrandComponent,{
    data:{
      Item:'Category',ItemId:categoryId,
      title:'Edit Category'
    },
    width:'50%',
    height:'40%'
  })  
  dialogRef.afterClosed().subscribe(()=>{
this.ngOnInit()
  })
  
  }

  addCategory(){
    if(this.addCategoryForm.valid){
      const values = this.addCategoryForm.getRawValue()
      this.service.addCategory(values).subscribe({
        next:(res:AddCategoryRes)=>{
          this.categories.push(res.data)
          this.toastr.success(res.message)
          // this.addModal.close()
        },
        error:(err:IApiRes)=>{
          this.toastr.error(err.message)
        }
      })
    }
  }
  goBackToProducts(){
    this.router.navigate(['/home/admin/productList'])
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

}
