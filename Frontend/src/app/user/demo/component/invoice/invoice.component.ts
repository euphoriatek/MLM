import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/user/services/api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  invoiceUrl: string | null = null;
  baseURL = environment.FilebasePath;
  invoice: any;
  order: any; 
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getInvoice(id).subscribe((res: any) => {
        if (res.status && res.data) {
          this.invoice = res.data;
          this.order = res.order;
        }
      });
    }
  }


}
