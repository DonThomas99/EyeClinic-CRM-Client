import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/userService/user.service';
import { validateByTrimming } from '../../../helpers/validation';
import { emailValidators, passwordValidators } from '../../../shared/validators';
import { IloginRes, IUser } from '../../../models/user';
import { Res } from '../../../models/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit{
  form!:FormGroup
  constructor(
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
    @Inject(Router) private readonly router: Router,
    private readonly service:UserService,
    private readonly toastr:ToastrService
  ){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:['',[validateByTrimming(emailValidators)]],
      password:['',[validateByTrimming(passwordValidators)]]
    })
  }

  onLogin(){
    if(this.form.valid){
      const user = this.form.getRawValue()
      this.service.login(user).subscribe({
        next:(res:IloginRes)=>{
          this.toastr.success(res.message)
            this.router.navigate(['/home/user/userDashboard'])
        },
        error:(err:Res)=>{

        }
      })

    }
  }

}
