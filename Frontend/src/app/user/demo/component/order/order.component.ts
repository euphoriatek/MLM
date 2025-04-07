import { Component } from '@angular/core';
import { ApiService } from 'src/app/user/services/api.service';
import { ToasterService } from 'src/app/services/toster.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  order: any;
  invoice_file: any;
  constructor(private api: ApiService, public route: Router, public toaster: ToasterService, public spinner: NgxSpinnerService) {

  }
  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.spinner.show();
    this.api.getOrder().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.order = response.data;
          this.invoice_file = response.data?.invoice.file;
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  openInvoice(id: number) {
    const url = this.route.createUrlTree(['/invoice', id]).toString();
    window.open(url, '_blank');
  }

  downloadInvoice() {
    if (this.invoice_file) {
      const invoiceUrl = `${environment.FilebasePath}/${this.invoice_file}`;
      fetch(invoiceUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = this.invoice_file.split('/').pop();
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          this.toaster.error('File not found', 'Invoice');
        });
    } else {
      this.toaster.error('File not found', 'Invoice');
    }
  }

  trackUrl(){
    const url = "https://www.delhivery.com/track-v2/package/"+ this.order.invoice.waybill;
    window.open(url, '_blank');
  }

}