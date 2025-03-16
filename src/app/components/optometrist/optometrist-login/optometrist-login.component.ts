import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-optometrist-login',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './optometrist-login.component.html',
  styleUrl: './optometrist-login.component.css'
})
export class OptometristLoginComponent implements OnInit {
  errorMessage!:string
  ngOnInit(): void {
  
  }

  onLogin(){

  }
 
}
