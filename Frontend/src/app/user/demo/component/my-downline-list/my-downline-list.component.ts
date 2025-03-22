import { Component,ViewChild } from '@angular/core';
import { ApiService } from 'src/app/user/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Table } from 'primeng/table';
import { ToasterService } from 'src/app/services/toster.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-downline-list',
  templateUrl: './my-downline-list.component.html',
  styleUrls: ['./my-downline-list.component.scss']
})
export class MyDownlineListComponent {
  users:any;
  @ViewChild('dt') dt: Table | undefined;
  constructor(public fb: FormBuilder, public api: ApiService, public spinner: NgxSpinnerService, private toaster: ToasterService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getTransactions();
  }


  getTransactions() {
    this.spinner.show();
    this.api.getDownlineUsers().subscribe({
      next: (response: any) => {
        if (response && response.status) {
          this.users = response.data;
        }
        else{
          this.spinner.hide();
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error(err);
        this.spinner.hide();
      }
    });
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
