import { HttpClient } from '@angular/common/http';
import { Component, importProvidersFrom, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';  // ✅ Import ToastrService
import { passwordMatchValidator, validateByTrimming } from '../../../helpers/validation';
import { emailValidators, mobileValidators, nameValidators, otpValidators, passwordValidators } from '../../../shared/validators';
import { UserService } from '../../../services/userService/user.service';
import { Res } from '../../../models/common';


@Component({
  selector: 'app-sign-up',
  standalone: true, 
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  constructor(
    @Inject(HttpClient) private readonly http: HttpClient,
    @Inject(Router) private readonly router: Router,
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
    private readonly service: UserService,
    private toastr: ToastrService // ✅ Inject ToastrService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [validateByTrimming(nameValidators)]],
      email: ['', [validateByTrimming(emailValidators)]],
      mobile: ['', [validateByTrimming(mobileValidators)]],
      password: ['', [validateByTrimming(passwordValidators)]],
      confirmPassword: ['', [validateByTrimming(passwordValidators)]],
    }, { validators: passwordMatchValidator });
  }

  onSignUp() {
    
    if (this.form.valid) {
      const values = this.form.getRawValue();
      this.service.userSignUp(values).subscribe({
        next: (res: Res) => {
          
          this.toastr.success(res.message, 'Success'); // ✅ Show Toastr notification
          this.router.navigate(['home/user/userLogin']);
        },
        error: (err:Res) => {
          this.toastr.error(err.message, 'Error'); // ✅ Show Toastr error
          this.form.reset()
        }
      });
    }
  }
}
