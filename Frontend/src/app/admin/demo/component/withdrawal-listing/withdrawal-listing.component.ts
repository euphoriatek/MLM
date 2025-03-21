import { Component,ViewChild } from '@angular/core';
import { ApiService } from 'src/app/admin/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Table } from 'primeng/table';
import { ToasterService } from 'src/app/services/toster.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-withdrawal-listing',
  templateUrl: './withdrawal-listing.component.html',
  styleUrls: ['./withdrawal-listing.component.scss']
})
export class WithdrawalListingComponent {
  withdrawals:any;
  @ViewChild('dt') dt: Table | undefined;
  constructor(public fb: FormBuilder, public api: ApiService, public spinner: NgxSpinnerService, private toaster: ToasterService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getWithdrawals();
  }


  getWithdrawals() {
    this.spinner.show();
    this.api.getWithdrawals().subscribe({
      next: (response: any) => {
        if (response && response.status) {
          this.withdrawals = response.data;
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

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
 
  approved(data:any):void{
    this.spinner.show();
    this.api.updateWithdrawalsStatus(data).subscribe({
      next: (response: any) => {
        if(response.status){
          this.toaster.success("Status updated to approved successfully!");
          this.getWithdrawals();
          this.spinner.hide();
        }
        else{
          this.spinner.hide();
        }
      },
      error: (err) => {
        console.error(err);
        this.spinner.hide();
      }
    });
   
  }
  reject(data:any){
    this.spinner.show();
    this.api.updateWithdrawals(data).subscribe({
      next: (response: any) => {
        if (response.status) {
        this.toaster.success("Status updated to Rejected successfully!");
        this.getWithdrawals();
        this.spinner.hide();
        }else{
          this.spinner.hide();
        }
      },
      error: (err) => {
        console.error(err);
        this.spinner.hide();
      }
    });
    
  }
}
