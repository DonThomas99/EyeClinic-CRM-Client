import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { categoryRes, Icategory } from '../../../models/category';
import { brandRes, IBrand } from '../../../models/brand';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../../../services/BrandService/brand.service';
import { CategoryService } from '../../../services/categoryService/category.service';
import { ProductService } from '../../../services/productService/product.service';
import { IpdtRes } from '../../../models/product';
import { validateByTrimming } from '../../../helpers/validation';
import { amountValidators, nameValidators, productNameValidators, stockValidators } from '../../../shared/validators';

@Component({
  selector: 'app-add-product',
  imports: [MatDialogModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  productForm!:FormGroup
  sleclectedFiles:File[] =[]
  categories:Icategory[] =[]
  brands:IBrand[] =[]
  constructor(
    private fb:FormBuilder,
    private readonly brandService:BrandService,
    private readonly categoryService:CategoryService,
    private readonly service:ProductService,
    public dialogRef:MatDialogRef<AddProductComponent>,
    private readonly toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name:['',[validateByTrimming(productNameValidators)]],
      category:['',[validateByTrimming(nameValidators)]],
      brand:['',[validateByTrimming(nameValidators)]],
      price:[0,[validateByTrimming(amountValidators)]],
      stock:[0,[validateByTrimming(stockValidators)]],
      description:['',Validators.required]
    })
    this.brandService.fetchBrandList().subscribe({
      next:(res:brandRes)=>{
        this.brands = res.data
      }
    })
    this.categoryService.fetchCategoryList().subscribe({
      next:(res:categoryRes)=>{
        this.categories = res.data
      }
    })
  }

  onFileChange(event:any){
    const files = event.target.files
    if(files.length >4 ){
      this.toastr.error('Select Image files')
      return
    }
    this.sleclectedFiles = Array.from(files)

  }

  onSubmit(){

    if(this.productForm.valid){
      const formData = new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('category', this.productForm.value.category);
      formData.append('brand', this.productForm.value.brand);
      formData.append('price', this.productForm.value.price);
      formData.append('stock', this.productForm.value.stock);
      formData.append('description', this.productForm.value.description);
      this.sleclectedFiles.forEach(file=>{
        formData.append('images',file)
      })
      
      this.service.addProduct(formData).subscribe({
        next:(res:IpdtRes)=>{
          console.log(res.data);
          this.dialogRef.close(res)
        },
        error:(res:IpdtRes)=>{
          this.dialogRef.close(res)
        }
      })
    }
  }

}
