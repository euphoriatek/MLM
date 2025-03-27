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
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-create-kyc',
  templateUrl: './create-kyc.component.html',
  styleUrls: ['./create-kyc.component.scss']
})
export class CreateKycComponent {
  KycForm!: FormGroup;
  PanKycForm!:FormGroup;
  imageUrl: any | null = null;
  imageError: string | null = null;
  imageErrorPan: string | null = null;
  imageUrlPan: any | null = null;
  isFormReadonly = false; 
  isReadonly = false;
  user:any;
  is_bank_verif:string='pending';
  is_pan_verify:boolean=false;
  BaseUrl = environment.FilebasePath;
  constructor(public cookiesService: UserCookiesService, public route: Router, public fb: FormBuilder, public spinner: NgxSpinnerService,
    public api: ApiService, public toaster: ToasterService,private router: Router
  ) {

  }
  ngOnInit(): void {
    this.user = this.cookiesService.getCookie('CurrentUser');
    this.is_bank_verif = this.user.kyc_status;
    console.log(this.is_bank_verif);
    this.is_pan_verify = this.user.pan_verified;
    this.KycForm = this.fb.group({
      account_holder_name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]*$')]],
      ifsc_code: ['', [Validators.required]],
      account_no: ['', [Validators.required]],
      bank_name: ['', Validators.required],
      branch_name: ['', [Validators.required]],
      // image:['', [Validators.required]]
    });
    this.getKycInfo();
    this.PanKycForm = this.fb.group({
      tax_document: ['', Validators.required],
      id_number: ['', Validators.required],
      pan_image: ['', Validators.required], 
    });
     

  }

  checkIfSc(event){
    if(event){
      const IFSC_Code = event.target.value;
      if(IFSC_Code.length < 1){
        return;
      }
      this.api.ValidateIFSC(IFSC_Code).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.KycForm.get('bank_name').setValue(response.data.BANK);
            this.KycForm.get('branch_name').setValue(response.data.BRANCH);
          }else{
            this.toaster.error("Invalid IFSC Code", 'KYC');
            this.KycForm.get('ifsc_code').reset();
            this.KycForm.get('bank_name').reset();
            this.KycForm.get('branch_name').reset();
          }
        },
        error: (err) => {
          console.error(err);
          this.toaster.error("Invalid IFSC Code", 'KYC');
          this.KycForm.get('ifsc_code').reset();
          this.KycForm.get('bank_name').reset();
          this.KycForm.get('branch_name').reset();
        }
      });
    }
  }

  CreateKyc(): void {
    this.spinner.show();
    if (this.KycForm.invalid) {
      this.KycForm.markAllAsTouched();
      this.spinner.hide();
      return;
    } else if (this.KycForm.valid) {
      // const formData = new FormData();
      // formData.append('account_holder_name', this.KycForm.get('account_holder_name').value);
      // formData.append('ifsc_code', this.KycForm.get('ifsc_code').value);
      // formData.append('account_no', this.KycForm.get('account_no').value);
      // formData.append('bank_name', this.KycForm.get('bank_name').value);
      // formData.append('branch_name', this.KycForm.get('branch_name').value);
      // if (this.KycForm.get('image').value) {
      //   formData.append('image', this.KycForm.get('image').value);
      // }
      this.api.CreateKyc(this.KycForm.value).subscribe({
        next: (response: any) => {
          this.spinner.hide();
          if (response && response.status) {
            this.is_bank_verif = "verified";
            this.cookiesService.updateCookie('CurrentUser', 'kyc_status', 'verified');
            this.toaster.success('Kyc Details created Successfully!');
            this.getKycInfo();
          }else{
            this.toaster.error(response.message);
            this.KycForm.get('account_no').reset();
          }
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err.error.message);
          this.toaster.error(err.error.message);
          this.spinner.hide();
        }
      });

    }
  }
  
  // onFileChange(event: Event): void {
  //   const fileInput = event.target as HTMLInputElement;
  //   const file = fileInput.files ? fileInput.files[0] : null;

  //   if (file) {
  //     const maxSizeInBytes = 2 * 1024 * 1024;
  //     if (file.size > maxSizeInBytes) {
  //       this.imageError = 'File size must be less than 2MB';
  //       this.imageUrl = null;
  //       return;
  //     }
  //     const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'];
  //     if (!allowedTypes.includes(file.type)) {
  //       this.imageError = 'Only JPG, PNG, JPEG, BMP, and GIF files are allowed';
  //       this.imageUrl = null;
  //       return;
  //     }
  //     if (file) {
  //       this.KycForm.patchValue({
  //         image: file
  //       });
  //       this.previewFile(file);
  //     }
  //   }
  // }
  
  // previewFile(file: File): void {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageUrl = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  onFileChangePanForm(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
  
    if (file) {
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        this.imageErrorPan = 'File size must be less than 2MB';
        this.imageUrlPan = null;
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.imageErrorPan = 'Only JPG, PNG, JPEG, BMP, and GIF files are allowed';
        this.imageUrlPan = null;
        return;
      }
      if (file) {
        this.PanKycForm.patchValue({
          pan_image: file
        });
        this.previewFilePan(file);
        this.imageErrorPan = '';
      }
    }
  }
  
  previewFilePan(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrlPan = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

CreatePanKyc(): void {
    this.spinner.show();
    if (this.PanKycForm.invalid) {
        this.PanKycForm.markAllAsTouched();
        this.spinner.hide();
        return;
    } else {
        const formData = new FormData();
        formData.append('tax_document', this.PanKycForm.get('tax_document').value);
        formData.append('id_number', this.PanKycForm.get('id_number').value);

        const image = this.PanKycForm.get('pan_image').value;
        if (image && !this.isFormReadonly) {
            formData.append('pan_image', image);
        }
        this.api.CreatePanKyc(formData).subscribe({
            next: (response: any) => {
                this.spinner.hide();
                if (response.status) {
                   if (response.data) {
                        this.is_pan_verify = true;
                        this.cookiesService.updateCookie('CurrentUser', 'pan_verified', true);
                        this.isFormReadonly = true;
                        this.getKycInfo();
                        this.toaster.success('PAN KYC created successfully!');
                    } else {
                        this.toaster.error(response.message);
                    }
                } else {
                    this.toaster.error(response.message);
                }
            },
            error: (err) => {
                console.log(err.error.message);
                this.toaster.error(err.error.message);
                this.spinner.hide();
            }
        });
    }
}

private disableFormFields(): void {
    this.PanKycForm.controls['tax_document'].disable();
    this.PanKycForm.controls['id_number'].disable();
    this.PanKycForm.controls['pan_image'].disable();
}


private disableFormBnkFields(): void {
  this.KycForm.controls['account_holder_name'].disable();
  this.KycForm.controls['ifsc_code'].disable();
  this.KycForm.controls['account_no'].disable();
  this.KycForm.controls['bank_name'].disable();
  this.KycForm.controls['branch_name'].disable();
  // this.KycForm.controls['image'].disable();
}

getKycInfo(): void {
  this.spinner.show();
  this.api.getUserKyc().subscribe({
    next: (response: any) => {
      if (response.status && response.data) {
        if (response.data.bank) {
          // If bank data exists, patch the form with bank details
          const bankData = response.data.bank;
          this.KycForm.patchValue({
            account_holder_name: bankData.account_holder_name,
            ifsc_code: bankData.ifsc_code,
            account_no: bankData.account_no,
            bank_name: bankData.bank_name,
            branch_name: bankData.branch_name,
            image: bankData.image
          });

          // Disable the bank fields and set the readonly flag
          this.disableFormBnkFields();
          this.isReadonly = true;
        }

        if (response.data.pan) {
          // If PAN data exists, patch the form with PAN details
          const panData = response.data.pan;
          this.PanKycForm.patchValue({
            tax_document: panData.tax_document,
            id_number: panData.id_number,
            pan_image: panData.pan_image,
          });
          if(panData.pan_image){
            this.imageUrlPan = this.BaseUrl+panData.pan_image;
          }
          this.disableFormFields();
          this.isFormReadonly = true;
          this.router.navigate(['/activation']);
        }
      }
      this.spinner.hide();
   
    },
    error: (err) => {
      console.log(err);
      this.spinner.hide();
    }
  });
}

}
