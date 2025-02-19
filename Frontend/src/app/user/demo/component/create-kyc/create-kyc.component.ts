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
  constructor(public cookiesService: UserCookiesService, public route: Router, public fb: FormBuilder, public spinner: NgxSpinnerService,
    public api: ApiService, public toaster: ToasterService
  ) {

  }
  ngOnInit(): void {
    this.KycForm = this.fb.group({
      account_holder_name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]*$')]],
      ifsc_code: ['', [Validators.required]],
      account_no: ['', [Validators.required]],
      bank_name: ['', Validators.required],
      branch_name: ['', [Validators.required]],
      image:['', [Validators.required]]
    });
    this.loadExistingBanKyc();

    this.loadExistingPanKyc(); 
    this.PanKycForm = this.fb.group({
      tax_document: ['', Validators.required],
      id_number: ['', Validators.required],
      pan_image: [Validators.required], 
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
            console.log(response.data);
            this.KycForm.get('bank_name').setValue(response.data.BANK);
            this.KycForm.get('branch_name').setValue(response.data.BRANCH);
          }else{
            this.toaster.error( "Not Found!", 'KYC');
            this.KycForm.get('ifsc_code').reset();
            this.KycForm.get('bank_name').reset();
            this.KycForm.get('branch_name').reset();
          }
        },
        error: (err) => {
          console.error(err);
          this.toaster.error( "Not Found!", 'KYC');
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
      const formData = new FormData();
      formData.append('account_holder_name', this.KycForm.get('account_holder_name').value);
      formData.append('ifsc_code', this.KycForm.get('ifsc_code').value);
      formData.append('account_no', this.KycForm.get('account_no').value);
      formData.append('bank_name', this.KycForm.get('bank_name').value);
      formData.append('branch_name', this.KycForm.get('branch_name').value);
      if (this.KycForm.get('image').value) {
        formData.append('image', this.KycForm.get('image').value);
      }
      this.api.CreateKyc(formData).subscribe({
        next: (response: any) => {
          this.spinner.hide();
          if (response && response.status) {
            const createkyc = response.data;
            this.toaster.success('Kyc Details created Successfully!');
            window.location.reload();
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
  
  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;

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
      if (file) {
        this.KycForm.patchValue({
          image: file
        });
        this.previewFile(file);
      }
    }
  }
  
  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

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
                        this.PanKycForm.patchValue({
                            tax_document: response.data.tax_document,
                            id_number: response.data.id_number,
                            pan_image: response.data.pan_image,
                        });
                        this.disableFormFields();
                        this.isFormReadonly = true;
                        this.toaster.success('This PAN record already exists.');
                    } else {
                        this.toaster.success('KYC Details created successfully!');
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

loadExistingPanKyc(): void {
  this.api.getExistingPanKyc().subscribe({
      next: (response: any) => {
          if (response.status && response.data) {
              this.PanKycForm.patchValue({
                  tax_document: response.data.tax_document,
                  id_number: response.data.id_number,
                  pan_image: response.data.pan_image,
              });
              this.disableFormFields();
              this.isFormReadonly = true;
              // this.toaster.success('This PAN record already exists.');
          }
      },
      error: (err) => {
          console.log(err);
      }
  });
}

loadExistingBanKyc(): void {
  this.api.getExistingBnkKyc().subscribe({
    next: (response: any) => {
      if (response.status && response.data) {
        this.KycForm.patchValue({
          account_holder_name: response.data.account_holder_name,
          ifsc_code: response.data.ifsc_code,
          account_no: response.data.account_no,
          bank_name: response.data.bank_name,
          branch_name: response.data.branch_name,
          image: response.data.image
        });
        this.disableFormBnkFields();
        this.isReadonly = true;
      }
    },
    error: (err) => {
      console.log(err);
    }
  });
}

private disableFormBnkFields(): void {
  this.KycForm.controls['account_holder_name'].disable();
  this.KycForm.controls['ifsc_code'].disable();
  this.KycForm.controls['account_no'].disable();
  this.KycForm.controls['bank_name'].disable();
  this.KycForm.controls['branch_name'].disable();
  this.KycForm.controls['image'].disable();
}
}
