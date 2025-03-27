import { Component,ViewChild } from '@angular/core';
import { ApiService } from 'src/app/admin/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Table } from 'primeng/table';
import { ToasterService } from 'src/app/services/toster.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orders:any;
  order: any;  
  visible: boolean = false;
    @ViewChild('dt') dt: Table | undefined;
    constructor(public fb: FormBuilder, public api: ApiService, public spinner: NgxSpinnerService, private toaster: ToasterService, private dialog: MatDialog,) { }
  
    ngOnInit(): void {
      this.getOrders();
    }
    getOrders() {
      this.spinner.show();
      this.api.getOrders().subscribe({
        next: (response: any) => {

          if (response && response.status) {
            this.orders = response.data;
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
    openViewDialog(order: any) {
      this.order = order; 
      this.visible=true;
    }
}
