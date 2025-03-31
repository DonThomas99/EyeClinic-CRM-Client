import { CommonModule } from '@angular/common';
import { Component,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule,MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-confirmation-component',
  standalone:true,
  imports: [MatDialogModule,CommonModule],
  templateUrl: './confirmation-component.component.html',
  styleUrl: './confirmation-component.component.css'
})
export class ConfirmationComponentComponent {
  constructor(
    public dialogRef:MatDialogRef<ConfirmationComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}
  confirm(){
    this.dialogRef.close(true)
  }
  cancel(){
    this.dialogRef.close(false)
  }
}
