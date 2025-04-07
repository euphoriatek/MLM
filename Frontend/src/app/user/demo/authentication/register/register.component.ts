import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/user/services/api.service';
import { ToasterService } from 'src/app/services/toster.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  states: any[] = [];
  countries: any[] = [];
  selectedCountryLogo: string | null = null;
  spnDetails:string;
  otpSent = false;
  otp: number;
  spnsrId:any;
  is_optVerify:boolean=false;
  otpTimer = 0;
  timerInterval: any; 
  firstSend:boolean=false;
  NumberIsValid:boolean=false;
  Sponserid: string | null = null;
  is_send:boolean=false;
  passwordFieldType: string = 'password';
  passwordType: string = 'password';
  cities:any;
  otpTimeDisplay:any;
  @ViewChild('otpInput') otpInputRef: ElementRef | undefined;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,private router: Router, private api: ApiService, private toaster: ToasterService, public spinner:NgxSpinnerService,public currentRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        parent_sponsor_id: ['', [ Validators.maxLength(10),Validators.required]],
        full_name: ['', Validators.required],
        state_id: ['', Validators.required],
        city_id: ['', Validators.required],
        email: ['', Validators.email],
        password: [
          '',
          [
            Validators.required
          ]
        ],
        mobile_no: ['', [Validators.maxLength(10),Validators.required, Validators.pattern(/^\d{10}$/)]],
        otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        confirm_password: ['', Validators.required],
        pin_code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        address: ['', Validators.required],
        agree: [false, Validators.requiredTrue]
      },
      { validators: passwordMatchValidator() }
    );
    this. fetchStates(); 
  
      this.currentRoute.paramMap.subscribe(params => {
        this.Sponserid = params.get('id');
        if (this.Sponserid) {
          this.signupForm.get('parent_sponsor_id').setValue(this.Sponserid);
        }
      });

      this.spnsrId = this.route.snapshot.queryParams;
      if (this.spnsrId?.['referral']) { 
        this.signupForm.patchValue({
          parent_sponsor_id: this.spnsrId['referral']
        });
      }
          
  }

  checkSPSid(event:any){
    if(event){
      const sponsorId = event.target.value;
      if(sponsorId.length < 10){
        this.spnDetails='';
        return;
      }
      this.api.validateWithSponsor(sponsorId).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.spnDetails = response.data;
          }else{
            this.toaster.error(response.message, 'Signup');
            this.spnDetails='';
          }
        },
        error: (err) => {
          console.error(err);
          this.toaster.error( "Sponser Id does't Match!", 'Signup');
        }
      });
    }
  }

  checkMobile(event: any) {
    if (event) {
      const mobile_number = event.target.value;
      if(mobile_number.length < 10){
        return;
      }
      this.api.checkMobile(mobile_number).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.NumberIsValid = false;
            this.toaster.error("Mobile number already exists!", 'Signup');
            this.signupForm.get('mobile_no').setValue('');
          } else {
            this.NumberIsValid = true;
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }


  // sendOtp(){
  //   this.is_send = true;
  //   const data = {"mobile_number":this.signupForm.value.mobile_no};
  //   this.api.GenerateOTP(data).subscribe({
  //     next: (response: any) => {
  //       this.is_send = false;
  //       if (response.status) {
  //         this.otpSent = true;
  //           this.otpTimer = 60;
  //           this.signupForm.controls['mobile_no'].disable();
  //           this.timerInterval = setInterval(() => {
  //             if (this.otpTimer > 0) {
  //               this.otpTimer--;
  //               if(this.otpTimer === 0){
  //                 this.firstSend = true;
  //                 this.signupForm.controls['mobile_no'].enable();
  //               }
  //             } else {
  //               this.signupForm.controls['mobile_no'].enable();
  //               clearInterval(this.timerInterval);
  //             }
  //           }, 1000);
  //           setTimeout(() => {
  //             this.otpInputRef?.nativeElement.focus();
  //           }, 100);
  //       }else{
  //         this.toaster.error( "Try again!", 'Signup');
  //       }
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.toaster.error( "Try again!", 'Signup');
  //     }
  //   });
  // }
  sendOtp() {
    this.is_send = true;
    const data = { "mobile_number": this.signupForm.value.mobile_no };
  
    this.api.GenerateOTP(data).subscribe({
      next: (response: any) => {
        this.is_send = false;
        if (response.status) {
          this.otpSent = true;
          this.otpTimer = 300; // 5 minutes = 300 seconds
          this.signupForm.controls['mobile_no'].disable();
          
          this.timerInterval = setInterval(() => {
            if (this.otpTimer > 0) {
              this.otpTimer--;
            } else {
              this.signupForm.controls['mobile_no'].enable();
              clearInterval(this.timerInterval);
            }
            // Format remaining time as mm:ss
            const minutes = Math.floor(this.otpTimer / 60); // Get minutes
            const seconds = this.otpTimer % 60; // Get seconds
            this.otpTimeDisplay = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
          }, 1000); // 1 second interval
          
          setTimeout(() => {
            this.otpInputRef?.nativeElement.focus();
          }, 100);
        } else {
          this.toaster.error("Try again!", 'Signup');
        }
      },
      error: (err) => {
        console.error(err);
        this.toaster.error("Try again!", 'Signup');
      }
    });
  }

  verifyOtp() {
    const enteredOtp = this.signupForm.get('otp')?.value;
    if(enteredOtp.length < 6){
      return;
    }
    this.api.verifyOTP(enteredOtp).subscribe({
      next: (response: any) => {
        if (response.status) {
          this.signupForm.controls['mobile_no'].disable();
          this.signupForm.controls['otp'].disable();
          this.toaster.success('Mobile No. OTP Verified Successfully Done');
          this.is_optVerify = true;
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

  fetchStates(): void {
    this.api.getStates().subscribe({
      next: (response: any) => {
        if (response?.status) {
          this.spinner.hide();
          this.states = response.data;
          this.getCity(11);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  addUser(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }else if(this.signupForm.valid && this.is_optVerify){
      this.spinner.show();
      this.signupForm.controls['mobile_no'].enable();
      this.signupForm.controls['otp'].enable();
      const { confirm_password,otp, agree, ...data } = this.signupForm.value;
      this.api.addUsers(data).subscribe({
        next: (response: any) => {
          if (response.status) { 
            this.signupForm.reset();
            this.router.navigate(['/login']);
            this.toaster.success('Registration successful.'), 'Signup';
          } else {
            this.toaster.error(response.message, 'Signup');
          }
          this.spinner.hide();
        },
        error: (err) => {
          console.error('Error:', err);
          this.spinner.hide();
          this.toaster.error('An error occurred while saving the user.', 'Signup');
        }
      });
    }
  }

  onCountryChange(event: any): void {
    const selectedCountryId = event.target.value;
    const selectedCountry = this.countries.find(country => country.id == selectedCountryId);
    if (selectedCountry) {
      this.selectedCountryLogo = 'assets/images/flags/' + selectedCountry.flag;
    } else {
      this.selectedCountryLogo = null;
    }
  }
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  passwordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  getCity(id:number): void {
    this.spinner.show();
    this.api.getCities(id).subscribe({
      next: (response: any) => {
        if (response?.status) {
          this.cities = response.data;
          this.spinner.hide();
        }
        else{
          this.spinner.hide();
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  loadCity(event:any){
    this.spinner.show();
    this.api.getCities(event.target.value).subscribe({
      next: (response: any) => {
        if (response?.status) {
          this.cities = response.data;
          this.spinner.hide();
        }else{
          this.spinner.hide();
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
// Password match validator
function passwordMatchValidator() {
  return (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;
    return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
  };
  
}
