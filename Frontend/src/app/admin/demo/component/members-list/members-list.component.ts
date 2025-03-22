import { Component,ViewChild } from '@angular/core';
import { ApiService } from 'src/app/admin/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Table } from 'primeng/table';
import { ToasterService } from 'src/app/services/toster.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent {
  membersList:any;
    @ViewChild('dt') dt: Table | undefined;
    constructor(public fb: FormBuilder, public api: ApiService, public spinner: NgxSpinnerService, private toaster: ToasterService, private dialog: MatDialog,) { }
  
    ngOnInit(): void {
      this.getmembersList();
    }
  
  
    getmembersList() {
      this.spinner.show();
      this.api.getmembersList().subscribe({
        next: (response: any) => {
          if (response && response.status) {
            this.membersList = response.data;
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

    updateBlock(user_id: number) {
      this.spinner.show();
      this.api.updateBlock(user_id).subscribe({
        next: (response: any) => {
          if (response && response.status) {
            if (response.is_block == 0) {
              this.toaster.success('User Inactive successfully');
            } else if (response.is_block ==1) {
              this.toaster.success('User Active successfully');
            }
          } else {
            this.toaster.error('Try Again');
            this.spinner.hide();
          }
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.toaster.error('Try Again');
          console.error(err);
        }
      });
    }
    
}