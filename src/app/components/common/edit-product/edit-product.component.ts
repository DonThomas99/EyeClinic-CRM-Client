import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product',
  imports: [],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  constructor(
    public dialogRef:MatDialogRef<EditProductComponent>
  ){
  }
  ngOnInit(): void {
    
  }

}
