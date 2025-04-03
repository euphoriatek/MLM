import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/user/services/api.service';
import { ToasterService } from 'src/app/services/toster.service';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { UserCookiesService } from 'src/app/user/services/usercookies.service';
import { DataShareService } from 'src/app/user/services/data-share.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  BaseUrl = environment.FilebasePath;
  isCollapsed = true;
  users: any;
  editProfileForm: FormGroup;
  countries: any;
  states: any;
  selectedCountryLogo: string;
  imageUrl: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  storedImageUrl: string | null = null;
  imageError:any;
  cities:any;
  constructor(private fb: FormBuilder,private api: ApiService,public toaster: ToasterService, public spinner: NgxSpinnerService,
    public cookiesService: UserCookiesService,private service: DataShareService
  ) {}

  ngOnInit(): void {
    this.getstates();
    this.getCity(11);
    this.getUsers();
    this.editProfileForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', Validators.email],
      pin_code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      address: ['', Validators.required],
      state_id: ['', Validators.required],
      city_id: ['', Validators.required],
      fatherandmothername: [''],
      gender: [''],
      title: ['', Validators.required],
      image:[''],
      dob:['']
    });
 
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  getUsers() {
    this.spinner.show();
    this.api.getUser().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.users = response.data;
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

  getCountry(): void {
    this.spinner.show();
    this.api.getCountry().subscribe({
      next: (response: any) => {
        if (response?.status) {
          this.countries = response.data;
        }
         this.spinner.hide();

      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  getstates(): void {
    this.spinner.show();
    this.api.getStates().subscribe({
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
  onCountryChange(event: any): void {
    const selectedCountryId = event.target.value;
    const selectedCountry = this.countries.find(country => country.id == selectedCountryId);
    if (selectedCountry) {
      this.selectedCountryLogo = 'assets/images/flags/' + selectedCountry.flag;
    } else {
      this.selectedCountryLogo = null;
    }
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        this.imageError = 'File size must be less than 2MB';
        this.imageUrl = null;
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.imageError = 'Only JPG, PNG, JPEG, BMP, and GIF files are allowed';
        this.imageUrl = null;
        return;
      }
      this.imageFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      this.editProfileForm.patchValue({
        image: file
      });
      this.imageError = '';
    }
  }
  editSubmit(): void {
    if (this.editProfileForm.valid) {
      const formData = new FormData();
      console.log(formData);
      Object.keys(this.editProfileForm.value).forEach(key => {
        let value = this.editProfileForm.get(key)?.value;
        if (value === null || value === undefined || value == '') {
          return;
        }
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
            this.imageError = '';
            this.cookiesService.updateCookie('CurrentUser', 'image', response.data?.image);
            this.service.updateProfileInfo(true);
            this.toaster.success('Profile updated successfully');
            this.getUsers();
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
  getCity(id:number): void {
    this.api.getCities(id).subscribe({
      next: (response: any) => {
        if (response?.status) {
          this.spinner.hide();
          this.cities = response.data;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}

