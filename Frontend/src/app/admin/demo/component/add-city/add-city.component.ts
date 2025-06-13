import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/admin/services/api.service'
import { ToasterService } from 'src/app/services/toster.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent {

  signupForm!: FormGroup;
  states: any[] = [];
  countries: any[] = [];
  selectedCountryLogo: string | null = null;
  spnDetails: string;
  otpSent = false;
  otp: number;
  spnsrId: any;
  is_optVerify: boolean = false;
  otpTimer = 0;
  timerInterval: any;
  firstSend: boolean = false;
  NumberIsValid: boolean = false;
  Sponserid: string | null = null;
  is_send: boolean = false;

  cities: any;
  otpTimeDisplay: any;
  @ViewChild('otpInput') otpInputRef: ElementRef | undefined;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private api: ApiService, private toaster: ToasterService, public spinner: NgxSpinnerService, public currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        state_id: ['', Validators.required],
        city_id: ['', Validators.required],
      },
    
    );
    this.fetchStates();

  }

  fetchStates(): void {
    this.spinner.show();
    this.api.getStates().subscribe({
      next: (response: any) => {
        if (response?.status) {
          this.spinner.hide();
          this.states = response.data;
        }
        this.spinner.hide();
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
    } else if (this.signupForm.valid) {
      this.spinner.show();
      // Prepare city data correctly
      const cityData = {
        city_id: this.signupForm.value.city_id,
        state_id: this.signupForm.value.state_id
      };

      this.api.addCity(cityData).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.toaster.success('City added successfully.');
            this.signupForm.reset({
              city_id: '',
              state_id: ''
            });
            // Optional: clear validation styles
            this.signupForm.markAsPristine();
            this.signupForm.markAsUntouched();
          } else {
            this.toaster.error(response.message);
            this.spinner.hide();
          }
        },
        error: (err) => {
          const errorMessage = err?.error?.message || 'An error occurred while adding the city.';
          this.toaster.error(errorMessage);
          this.spinner.hide();
        }
      });
    }
  }

}
