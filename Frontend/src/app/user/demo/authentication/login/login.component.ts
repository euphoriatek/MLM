// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserCookiesService } from 'src/app/user/services/usercookies.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from 'src/app/user/services/api.service';
import { ToasterService } from 'src/app/services/toster.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  LoginForm!: FormGroup;
  passwordFieldType: string = 'password';
  constructor(public cookiesService: UserCookiesService, public route: Router, public fb: FormBuilder, public spinner: NgxSpinnerService,
    public api: ApiService, public toaster: ToasterService
  ) {

  }
  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      mobile_no: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  
  }

  Login(): void {
    this.spinner.show();
    if (this.LoginForm.invalid) {
      this.LoginForm.markAllAsTouched();
      this.spinner.hide();
      return;
    } else if (this.LoginForm.valid) {
      const data = this.LoginForm.value;
      this.api.login(data).subscribe({
        next: (response: any) => {
          this.spinner.hide();
          if (response && response.status) {
            const UserInfo = response.data;
            this.cookiesService.setCookie('CurrentUser', UserInfo);
            this.route.navigate(['/dashboard/default']);
            this.toaster.success(response.message || 'Login Successful');
          } else {
            this.toaster.error(response.message || 'Invalid Mobile Number and Password!', 'Login');
          }
        },
        error: (err) => {
          this.toaster.error('Invalid Mobile Number and Password!', 'Login');
          this.spinner.hide();
          console.error(err);
        }
      });
    }
  }
  
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
