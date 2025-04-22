import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrandService } from '../../../services/BrandService/brand.service';
import { CategoryService } from '../../../services/categoryService/category.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { brandRes, IBrand } from '../../../models/brand';
import { categoryRes, Icategory, OCategory } from '../../../models/category';
import { validateByTrimming } from '../../../helpers/validation';
import { nameValidators } from '../../../shared/validators';
import { CommonModule } from '@angular/common';
import { NameValidationComponent } from "../name-validation/name-validation.component";
import { IApiRes } from '../../../models/common';

@Component({
  selector: 'app-update-category-brand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NameValidationComponent],
  templateUrl: './update-category-brand.component.html',
  styleUrl: './update-category-brand.component.css'
})
export class UpdateCategoryBrandComponent implements OnInit {
  Item!: IBrand | Icategory;
  EditItemForm!: FormGroup;
  InitialFormValues!: IBrand | Icategory;
  isSubmitted: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private toastr: ToastrService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    public dialogRef: MatDialogRef<UpdateCategoryBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Item: string, ItemId: string, title: string }
  ) {}

  ngOnInit() {
    this.initializeForm();
    if (this.data.Item == 'Brand') {
      this.brandService.fetchBrandList().subscribe({
        next: (res: brandRes) => {
          const foundBrand = res.data.find(c => c._id === this.data.ItemId);
          if (foundBrand) {
            this.Item = foundBrand;
            this.patchFormValues();
          }
        }
      });
    } else {
      this.categoryService.fetchCategoryList().subscribe({
        next: (res: categoryRes) => {
          const foundCategory = res.data.find(c => c._id === this.data.ItemId);
          if (foundCategory) {
            this.Item = foundCategory;
            this.patchFormValues();
          }
        }
      });
    }
  }

  initializeForm() {
    this.EditItemForm = this.formBuilder.group({
      name: ['', [validateByTrimming(nameValidators)]],
    });
  }

  patchFormValues() {
    this.EditItemForm.patchValue({
      name: this.Item.name
    });
    this.InitialFormValues = { ...this.EditItemForm.value };
  }

  getChangedValues(): Partial<IBrand | Icategory> {
    const changedValues: Partial<IBrand | Icategory> = {};
    if (this.EditItemForm && this.InitialFormValues) {
      Object.keys(this.EditItemForm.value).forEach(key => {
        if (this.EditItemForm.value[key] !== this.InitialFormValues[key as keyof (IBrand | Icategory)]) {
          changedValues[key as keyof (IBrand | Icategory)] = this.EditItemForm.value[key];
        }
      });
    }
    return changedValues;
  }

  onSubmit() {
    this.isSubmitted = true;
    let changes:Partial<OCategory>
    if (this.EditItemForm.valid) {
       changes = this.getChangedValues();
      if (Object.keys(changes).length === 0) {
        this.toastr.info('No changes detected');
        return;
      }
  
   
  
      if (this.data.Item === 'Category') {
        this.categoryService.updateCategory(this.data.ItemId, changes).subscribe({
          next: (res: IApiRes) => {
            this.toastr.success(res.message);
            this.dialogRef.close(true);
          },
          error: (err) => {
            const errorMessage = err.error?.message || 'Failed to update category';
            this.toastr.error(errorMessage);
            console.error('Category update error:', err);
          }
        });
      } else {
        this.brandService.updateBrand(this.data.ItemId, changes).subscribe({
          next: (res: IApiRes) => {
            this.toastr.success(res.message);
            this.dialogRef.close(true);
          },
          error: (err) => {
            const errorMessage = err.error?.message || 'Failed to update brand';
            this.toastr.error(errorMessage);
            console.error('Brand update error:', err);
          }
        });
      }
    } else {
      this.toastr.error('Please fix the validation errors');
    }
  }
  closeComponent() {
    this.dialogRef.close(false);
  }
}