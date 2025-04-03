import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCookiesService } from 'src/app/user/services/usercookies.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from 'src/app/user/services/api.service';
import { ToasterService } from 'src/app/services/toster.service';
import { DataShareService } from 'src/app/user/services/data-share.service';

@Component({
  selector: 'app-create-kyc',
  templateUrl: './create-kyc.component.html',
  styleUrls: ['./create-kyc.component.scss']
})
export class CreateKycComponent {
  KycForm!: FormGroup;
  PanKycForm!:FormGroup;
  isFormReadonly = false; 
  isReadonly = false;
  user:any;
  is_bank_verif:string='pending';
  is_pan_verify:boolean=false;
  activeIndex: number = 0;
  constructor(public cookiesService: UserCookiesService, public route: Router, public fb: FormBuilder, public spinner: NgxSpinnerService,
    public api: ApiService, public toaster: ToasterService,private router: Router,private service: DataShareService
  ) {

  }
  ngOnInit(): void {
    this.user = this.cookiesService.getCookie('CurrentUser');
    this.is_bank_verif = this.user.kyc_status;
    this.is_pan_verify = this.user.pan_verified;
    this.KycForm = this.fb.group({
      account_holder_name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]*$')]],
      ifsc_code: ['', [Validators.required]],
      account_no: ['', [Validators.required]],
      bank_name: ['', Validators.required],
      branch_name: ['', [Validators.required]]
    });
    this.getKycInfo();
    this.PanKycForm = this.fb.group({
      tax_document: ['pan', Validators.required],
      id_number: ['', Validators.required]
    });
    this.openDefault(); 

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
      this.api.CreateKyc(this.KycForm.value).subscribe({
        next: (response: any) => {
          this.spinner.hide();
          if (response && response.status) {
            this.activeIndex = 1;
            this.is_bank_verif = "verified";
            this.cookiesService.updateCookie('CurrentUser', 'kyc_status', 'verified');
            this.toaster.success('Kyc Details Created Successfully!');
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
        this.api.CreatePanKyc(formData).subscribe({
            next: (response: any) => {
                this.spinner.hide();
                if (response.status) {
                   if (response.data) {
                        this.is_pan_verify = true;
                        this.cookiesService.updateCookie('CurrentUser', 'pan_verified', true);
                        this.isFormReadonly = true;
                        this.getKycInfo();
                        this.toaster.success('PAN KYC Created successfully!');
                        this.router.navigate(['/activation']);
                        this.service.updateProfileInfo(true);
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
}


private disableFormBnkFields(): void {
  this.KycForm.controls['account_holder_name'].disable();
  this.KycForm.controls['ifsc_code'].disable();
  this.KycForm.controls['account_no'].disable();
  this.KycForm.controls['bank_name'].disable();
  this.KycForm.controls['branch_name'].disable();
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
            id_number: panData.id_number
          });
          this.disableFormFields();
          this.isFormReadonly = true;
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

activeIndexChange(index: number | number[]) {
  this.activeIndex = Array.isArray(index) ? index[0] : index;
  if (this.activeIndex === 1 && this.is_bank_verif != 'verified') {
    this.activeIndex = 0;
  }
}

openDefault(){
  if (this.is_bank_verif === 'verified' && this.is_pan_verify) {
    this.activeIndex = 0;
  } else if(this.is_bank_verif == 'verified' && !this.is_pan_verify) {
    this.activeIndex = 1;
  }else{
    this.activeIndex = 0;
  }
}
openPanCardTab() {
  if (this.is_bank_verif === 'verified') {
    this.activeIndex = 1;
  } else {
    this.toaster.error("Please verify your Bank Info before accessing the Pan Card section.");
  }
}
}
