import { Component,ViewChild } from '@angular/core';
import { ApiService } from 'src/app/user/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Table } from 'primeng/table';
import { ToasterService } from 'src/app/services/toster.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bank-withdrawal-history',
  templateUrl: './bank-withdrawal-history.component.html',
  styleUrls: ['./bank-withdrawal-history.component.scss']
})
export class BankWithdrawalHistoryComponent {
  withdrawals:any;
  @ViewChild('dt') dt: Table | undefined;
  constructor(public fb: FormBuilder, public api: ApiService, public spinner: NgxSpinnerService, private toaster: ToasterService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getWithdrawals();
  }


  getWithdrawals() {
    this.spinner.show();
    this.api.getWithdrawalsHistory().subscribe({
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

  viewDialog(){
    
  }
}
