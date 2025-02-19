import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/user/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Table } from 'primeng/table';
import { environment } from 'src/environments/environment';
import { ToasterService } from 'src/app/services/toster.service';
import { MatDialog } from '@angular/material/dialog';
import { NewConfirmDialogComponent } from 'src/app/user/services/new-confirm-dialog.component';
import { Router } from '@angular/router'; 
declare var Razorpay: any;

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent {
  products: any[] = [];
  BaseUrl = environment.FilebasePath;
  formSubmitted = false;
  userId = 1;
  purchaseData: { name: any; user_id: number; product_id: any; size: any; price: any; };

  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    private dialog: MatDialog, 
    public spinner: NgxSpinnerService,
    private toaster: ToasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.api.getProductUser().subscribe({
      next: (response: any) => {
        if (response && response.status) {
          this.products = response.data;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // purchaseProduct(product: any) {
  //   this.formSubmitted = true;
  //   if (!product.selectedSize || product.selectedSize === '0') {
  //     console.error('Please select a valid size.');
  //     return;
  //   }
  //   const dialogRef = this.dialog.open(NewConfirmDialogComponent, {
  //     data: {
  //       message: `Are you sure you want to purchase ${product.name}?`
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 'confirmed') {
  //       const purchaseData = {
  //         name: product.name,
  //         user_id: this.userId,
  //         product_id: product.id,
  //         size: product.selectedSize,
  //         price: product.price
  //       };

  //       this.api.PurchaseProduct(purchaseData).subscribe(
  //         (response) => {
  //           console.log('Purchase successful:', response);
  //           this.openRazorpayDialog(product);
  //         },
  //         (error) => {
  //           console.error('Error making purchase:', error);
  //         }
  //       );
  //     } else {
  //       console.log('Purchase canceled');
  //     }
  //   });
  // }


  purchaseProduct(product: any) {
    this.formSubmitted = true;
    if (!product.selectedSize || product.selectedSize === '0') {
      console.error('Please select a valid size.');
      return;
    }
    const dialogRef = this.dialog.open(NewConfirmDialogComponent, {
      data: {
        message: `Are you sure you want to purchase this Product?`
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        const purchaseData = {
          name: product.name,
          user_id: this.userId,
          product_id: product.id,
          size: product.selectedSize,
          price: product.price
        };
  
        this.purchaseData = purchaseData;
        this.router.navigate(['/checkout'], { queryParams: { id: product.id } });

      } else {
        console.log('Purchase canceled');
      }
    });
  }

  
}
