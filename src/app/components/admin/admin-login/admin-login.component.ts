import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'
import { AdminService } from '../../../services/adminService/admin.service';
import Swal from 'sweetalert2'
import { IApiRes } from '../../../models/common';

@Component({
  selector: 'app-admin-login',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
  
})
export class AdminLoginComponent implements OnInit {
  errorMessage!:string
  form!:FormGroup
  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly adminService:AdminService,
    private readonly router:Router
  ){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  submit(){
    if(this.form.valid){
      const values = this.form.getRawValue()
      this.adminService.adminLogin(values.email,values.password).subscribe({
        next:(res:IApiRes)=>{
           this.router.navigate(['home/admin/adminDashboard'])
          Swal.fire({
            icon:'success',
            text:res.message
          })
        },
        error:(err)=>{
          Swal.fire({
            icon:'error',
            text:err.error.message
          })
        }
      })

    }
    
  }

}
