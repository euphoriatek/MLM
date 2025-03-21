import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from 'src/app/user/services/api.service';
import { ToasterService } from 'src/app/services/toster.service';
@Component({
  selector: 'app-bank-withdrawal',
  templateUrl: './bank-withdrawal.component.html',
  styleUrls: ['./bank-withdrawal.component.scss']
})
export class BankWithdrawalComponent implements OnInit {
  form: FormGroup;
  isCollapsed: boolean = true;
  selectedWallet: string = '0';  
  users: any;
  isReadonly: boolean;
  isFormReadonly: boolean;
  walletBalance :any;
  isInsufficientBalance: boolean = false;
  constructor(private fb: FormBuilder, public spinner: NgxSpinnerService, public api: ApiService, public toaster: ToasterService) {}
  ngOnInit(): void {  
    this.form = this.fb.group({
      account_holder_name: [''],
      ifsc_code: [''],
      account_no: [''],
      bank_name: [''],
      branch_name: [''],
      price :[''],
    });
    this.getKycInfo();
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
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
            this.form.get('bank_name').setValue(response.data.BANK);
            this.form.get('branch_name').setValue(response.data.BRANCH);
          }else{
            this.toaster.error( "Not Found!", 'KYC');
            this.form.get('ifsc_code').reset();
            this.form.get('bank_name').reset();
            this.form.get('branch_name').reset();
          }
        },
        error: (err) => {
          console.error(err);
          this.toaster.error( "Not Found!", 'KYC');
          this.form.get('ifsc_code').reset();
          this.form.get('bank_name').reset();
          this.form.get('branch_name').reset();
        }
      });
    }
  }
  
  getKycInfo(): void {
    this.spinner.show();
    this.api.getUserKyc().subscribe({
      next: (response: any) => {
        if (response.status && response.data) {
          var wallet_balance = response.data.wallet_balance;
          this.walletBalance = wallet_balance;

          if(response.data.bank){
            var data = response.data.bank;
            this.form.patchValue({
              account_holder_name: data.account_holder_name,
              ifsc_code: data.ifsc_code,
              account_no: data.account_no,
              bank_name: data.bank_name,
              branch_name: data.branch_name,
              image: data.image
            });
            this.disableFormBnkFields();
            this.isReadonly = true;
          }else {
           
          }
        }
        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
      }
    });
  }
  
  onSubmit() {
    if (this.checkBalanceBeforeSubmit()) {
      this.enableFormFields();
      const data = this.form.value;
      this.spinner.show(); 
      this.api.SaveWithdrawal(data).subscribe({
        next: (response: any) => {
          if (response) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            this.toaster.success('Withdrawal Successful', 'Success');
          }
          this.spinner.hide(); 
        },
        error: (err) => {
          this.toaster.error('An error occurred during withdrawal.', 'Error');
          this.spinner.hide(); 
        }
      });
      this.disableFormBnkFields();
    } else {
      this.toaster.error("Insufficient balance in wallet.", 'Error');
    }
  }
  

  private enableFormFields(): void {
    this.form.controls['account_holder_name'].enable();
    this.form.controls['ifsc_code'].enable();
    this.form.controls['account_no'].enable();
    this.form.controls['bank_name'].enable();
    this.form.controls['branch_name'].enable();
  }
  
  private disableFormBnkFields(): void {
    this.form.controls['account_holder_name'].disable();
    this.form.controls['ifsc_code'].disable();
    this.form.controls['account_no'].disable();
    this.form.controls['bank_name'].disable();
    this.form.controls['branch_name'].disable();
  }

  checkBalanceBeforeSubmit() {
    const price = this.form.get('price')?.value;
  
    if (price <= 0) {
      this.isInsufficientBalance = true;  
      return false;
    }
    if (price > this.walletBalance) {
      this.isInsufficientBalance = true;
      return false;
    }

    this.isInsufficientBalance = false;
    return true;
  }
  
}
