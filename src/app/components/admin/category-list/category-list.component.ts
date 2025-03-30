import { Component, ElementRef, Inject, NgModule, OnInit, viewChild } from '@angular/core';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { AddCategoryRes, categoryRes, Icategory } from '../../../models/category';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { AdminService } from '../../../services/adminService/admin.service';
import { IApiRes } from '../../../models/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  imports: [AdminHeaderComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  addCategoryForm!:FormGroup;  
  categories!:Icategory[];

  addModal = viewChild<ElementRef>('addModal');
  blockToggleModal = viewChild<ElementRef>('blockToggleModal');


  constructor(private readonly router:Router,
        @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
        private readonly service:AdminService,
        private toastr: ToastrService
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
  toggleBlockStatus(categoryId:string){}

}
