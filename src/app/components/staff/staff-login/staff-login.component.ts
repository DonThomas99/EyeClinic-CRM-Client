import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-staff-login',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './staff-login.component.html',
  styleUrl: './staff-login.component.css'
})
export class StaffLoginComponent implements OnInit {
  errorMessage!: string
  ngOnInit(): void {
    
  }
  onLogin(){

  }

}
