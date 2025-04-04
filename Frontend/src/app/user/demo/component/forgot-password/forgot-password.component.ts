// angular import
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from 'src/app/user/services/api.service';
import { ToasterService } from 'src/app/services/toster.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgetPassword!: FormGroup;
  otpForm!: FormGroup;
  passwords!:FormGroup;
  passwordFieldType: string = 'password';
  visible:boolean=false;
  resetPassword:boolean=false;
  mobile:any;
  constructor(public route: Router, public fb: FormBuilder, public spinner: NgxSpinnerService,
    public api: ApiService, public toaster: ToasterService
  ) {

  }
  ngOnInit(): void {
    this.forgetPassword = this.fb.group({
      mobile_number: ['', [Validators.required]]
    });
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]]
    });
    this.passwords = this.fb.group({
      password: [ "", [ Validators.required],
      ],
    });
  }

  sendOtp(): void {
    this.spinner.show();
    if (this.forgetPassword.invalid) {
      this.forgetPassword.markAllAsTouched();
      this.spinner.hide();
      return;
    } else if (this.forgetPassword.valid) {
      const data = this.forgetPassword.value;
      this.api.sendOtp(data).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.mobile=data.mobile_number;
            this.toaster.success("OTP sent! Please check your Mobile for the verification code.")
            this.visible = true;
          } else {
            this.toaster.error(response.message);
          }
          this.spinner.hide();
        },
        error: (err) => {
          console.error(err);
          this.toaster.error("Invalid User");
          this.spinner.hide();
        }
      });
    }
  }

  verifyOtp() {
    const enteredOtp = this.otpForm.get('otp')?.value;
    if(enteredOtp.length < 6){
      return;
    }
    this.api.verifyOTP(enteredOtp).subscribe({
      next: (response: any) => {
        if (response.status) {
          this.visible = false;
          this.resetPassword = true;
        }else{
          this.toaster.error(response.message);
        }
      },
      error: (err) => {
        console.error(err);
        this.toaster.error('Invalid OTP. Please try again.');
      }
    });
  }
  resetPasswords(){
   if(this.passwords.valid){
    this.passwords.value.mobile_number=this.mobile;
    this.api.updatePassword(this.passwords.value).subscribe({
      next: (response: any) => {
        if (response.status) {
          this.toaster.success(response.message);
          this.route.navigate(['/login']);
        }else{
          this.toaster.error(response.message);
        }
      },
      error: (err) => {
        console.error(err);
        this.toaster.error('Please try again.');
      }
    });
   }
  }
}
