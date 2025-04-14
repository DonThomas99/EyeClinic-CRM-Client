import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Icategory } from '../../../models/category';
import { IBrand } from '../../../models/brand';
import { ProductService } from '../../../services/productService/product.service';
import { ToastrService } from 'ngx-toastr';
import { Iproduct, IproductRes } from '../../../models/product';
import { CategoryService } from '../../../services/categoryService/category.service';
import { BrandService } from '../../../services/BrandService/brand.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { validateByTrimming } from '../../../helpers/validation';
import { productNameRegex } from '../../../shared/constants';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  standalone: true
})
export class EditProductComponent implements OnInit {
  EditProductForm!: FormGroup;
  categories: Icategory[] = [];
  brands: IBrand[] = [];
  selectedFiles: File[] = [];
  productId!: string;
  product!: Iproduct;
  sanitizedUrls: SafeResourceUrl[] = [];
  originalImageUrls: string[] = [];
  initialFormValues!: Iproduct;
  isLoading = true;

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string },
    private service: ProductService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private sanitizer: DomSanitizer
  ) {
    this.productId = data.productId;
  }

  ngOnInit(): void {
    this.initializeForm();

    this.categoryService.fetchCategoryList().subscribe(res => {
      this.categories = res.data;
    });

    this.brandService.fetchBrandList().subscribe(res => {
      this.brands = res.data;
    });

    this.service.fetchProducts().subscribe({
      next: (res: IproductRes) => {
        const foundProduct = res.data.find(p => p._id === this.productId);
        if (!foundProduct) {
          this.toastr.error('Product not found');
          this.dialogRef.close();
          return;
        }

        this.product = foundProduct;
        this.originalImageUrls = [...this.product.images];
        this.sanitizedUrls = this.product.images.map(url => 
          this.sanitizer.bypassSecurityTrustResourceUrl(url)
        );
        
        this.patchFormValues();
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error(err.message || 'Failed to load product');
        this.dialogRef.close();
      }
    });
  }

  initializeForm(): void {
    this.EditProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(200)]],
      description: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(100)]],
      images: [null]
    });
  }

  patchFormValues(): void {
    this.EditProductForm.patchValue({
      name: this.product.name,
      brand: this.product.brand._id,
      category: this.product.category._id,
      price: this.product.price,
      description: this.product.description,
      stock: this.product.stock
    });

    this.initialFormValues = { ...this.EditProductForm.value };
    Object.keys(this.EditProductForm.controls).forEach(key => {
      this.EditProductForm.get(key)?.valueChanges.subscribe(() => this.updateValidators());
    });
  }

  updateValidators(): void {
    const changedValues = this.getChangedValues();
    Object.keys(changedValues).forEach(key => {
      const control = this.EditProductForm.get(key);
      if (control) {
        control.clearValidators();

        if (key === 'name') {
          control.setValidators([Validators.required]);
        } else if (['brand', 'category', 'description'].includes(key)) {
          control.setValidators([Validators.required]);
        } else if (key === 'price' || key === 'stock') {
          control.setValidators([Validators.required, Validators.min(0)]);
        } else if (key === 'images') {
          control.setValidators([Validators.required]);
        }

        control.updateValueAndValidity();
      }
    });
  }

  getChangedValues(): Partial<Iproduct> {
    const changedValues: Partial<Iproduct> = {};
    if (this.EditProductForm && this.initialFormValues) {
      Object.keys(this.EditProductForm.value).forEach(key => {
        if (this.EditProductForm.value[key] !== this.initialFormValues[key as keyof Iproduct]) {
          changedValues[key as keyof Iproduct] = this.EditProductForm.value[key];
        }
      });
    }
    return changedValues;
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
      this.EditProductForm.patchValue({ images: this.selectedFiles });
      this.EditProductForm.get('images')?.updateValueAndValidity();
    }
  }

  deleteImage(index: number): void {
    this.originalImageUrls.splice(index, 1);
    this.sanitizedUrls.splice(index, 1);
  }

  onSubmit(): void {
    if (this.EditProductForm.invalid) {
      // this.toastr.error('Please fill in all required fields.');
      return;
    }

    const changes = this.getChangedValues();

    const formData = new FormData();
    Object.entries(changes).forEach(([key, value]) => {
      if (key === 'images' && this.selectedFiles.length) {
        this.selectedFiles.forEach(file => {
          formData.append('images', file);
        });
      } else {
        formData.append(key, value as string);
      }
    });

    // Always send remaining original image URLs
    formData.append('existingImages', JSON.stringify(this.originalImageUrls));

    this.service.updateProduct(this.productId, formData).subscribe({
      next: () => {
        this.toastr.success('Product updated successfully!');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toastr.error(err.message || 'Failed to update product.');
      }
    });
  }

  viewImages(): void {
    const imageModal = document.getElementById('view-images') as HTMLDialogElement;
    imageModal?.showModal();
  }

  closeComponent(){
    this.initializeForm()
    this.dialogRef.close(true)
  }

}