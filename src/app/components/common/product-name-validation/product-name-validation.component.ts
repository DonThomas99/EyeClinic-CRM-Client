import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-product-name-validation',
  imports: [CommonModule],
  templateUrl: './product-name-validation.component.html',
  styleUrl: './product-name-validation.component.css'
})
export class ProductNameValidationComponent {
@Input() productNameControl:AbstractControl |null = null
@Input() isSubmitted:boolean = false 

}
