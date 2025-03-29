// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/admin/services/api.service';
import { AdminCookiesService } from 'src/app/admin/services/admincookies.service';
import { ToasterService } from 'src/app/services/toster.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormsModule } from '@angular/forms';

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
  constructor(public route:Router,public fb:FormBuilder,public spinner :NgxSpinnerService,public api:ApiService,public cookiesService:AdminCookiesService, public toaster:ToasterService){

  }
  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      mobile_no : ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
    
  Login(): void {
    this.spinner.show();
    if (this.LoginForm.invalid) {
      this.LoginForm.markAllAsTouched();
      this.spinner.hide();
      return;
    }else if(this.LoginForm.valid){
      const data = this.LoginForm.value;
      this.api.login(data).subscribe({
        next: (response: any) => {
          this.spinner.hide();
          if (response && response.status) {
            const AdminInfo = response.data;
            this.cookiesService.setCookie('AdminUser', AdminInfo);
            this.route.navigate(['/admin/dashboard/default']);
            this.toaster.success(response.message || 'Login Successful');
          }else{
            this.toaster.error(response.message || 'Invalid Mobile Number and Password!', 'Login');
          }
        },
        error: (err) => {
          this.toaster.error('Invalid mobile number and Password!', 'Login');
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
