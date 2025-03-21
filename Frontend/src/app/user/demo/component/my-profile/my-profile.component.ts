import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/user/services/api.service';
import { ToasterService } from 'src/app/services/toster.service';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
    BaseUrl = environment.FilebasePath;
    // BaseUrl = 'https://sklife.in/sk-portal/backend/public/storage/';
  isCollapsed = true;
  users: any;
  editProfileForm: FormGroup;
  countries: any;
  states: any;
  selectedCountryLogo: string;
  imageUrl: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  storedImageUrl: string | null = null;
  constructor(private fb: FormBuilder,private api: ApiService,public toaster: ToasterService, public spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getCountry();
    this.editProfileForm = this.fb.group({
      full_name: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      pin_code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      address: ['', Validators.required],
      country_id: ['98', Validators.required],
      state_id: ['', Validators.required],
      fatherandmothername: [''],
      gender: [0, Validators.required],
      title: [''],
      image:[''],
      dob:['']
    });
 
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  getUsers() {
    this.spinner.show();
    this.api.getUsers().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.users = response.data;
          console.log(this.users);
          
          this.storedImageUrl = this.users.image ? `${this.BaseUrl}${this.users.image}` : null;
          this.editProfileForm.patchValue(this.users);
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }
  onSubmit() {

    if (this.users) {
      this.spinner.show();
      this.api.updateUsers(this.users).subscribe({
        next: (response: any) => {
          if (response.status) 
          this.toaster.success(' Contact and Email updated successfully');
          this.spinner.hide();
        },
        error: (err) => {
          console.error('Error updating user', err);
        }
      });
    }
  }
  getstates(id:number): void {
    this.spinner.show();
    this.api.getStates(id).subscribe({
      next: (response: any) => {
        if (response?.status) {
          this.states = response.data;
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  getCountry(): void {
    this.spinner.show();
    this.api.getCountry().subscribe({
      next: (response: any) => {
        if (response?.status) {
          this.countries = response.data;
          this.getstates(98);
        }
         this.spinner.hide();

      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  onCountryChange(event: any): void {
    const selectedCountryId = event.target.value;
    const selectedCountry = this.countries.find(country => country.id == selectedCountryId);
    if (selectedCountry) {
      this.selectedCountryLogo = 'assets/images/flags/' + selectedCountry.flag;
    } else {
      this.selectedCountryLogo = null;
    }
    this.getstates(selectedCountryId);
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      this.editProfileForm.patchValue({
        image: file
      });
    }
  }
  editSubmit(): void {
    if (this.editProfileForm.valid) {
      const formData = new FormData();
      console.log(Object.keys(this.editProfileForm.value));
      
      Object.keys(this.editProfileForm.value).forEach(key => {
        let value = this.editProfileForm.get(key)?.value;
        if (key === 'dob' && value) {
          const formattedDob = new Date(value).toISOString().split('T')[0]; 
          formData.append(key, formattedDob);
        } else if (key === 'image' && this.imageFile) {
          formData.append('image', this.imageFile, this.imageFile.name);
        } else {
          formData.append(key, value);
        }
      });
      this.spinner.show();
      this.api.updateProfile(formData).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.toaster.success('Profile updated successfully');
          } else {
            this.toaster.error('Failed to update profile');
          }
          this.spinner.hide();
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.toaster.error('An error occurred while updating your profile');
        }
      });
    } else {
      this.editProfileForm.markAllAsTouched();
    }
  }
  

}

