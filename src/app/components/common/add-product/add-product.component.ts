import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  imports: [MatDialogModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(
    public dialogRef:MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}
}
