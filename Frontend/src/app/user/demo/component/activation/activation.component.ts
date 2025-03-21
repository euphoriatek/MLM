import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/user/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import { ToasterService } from 'src/app/services/toster.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/admin/services/confirm-dialog.component';  
import { Router } from '@angular/router';
import { UserCookiesService } from 'src/app/user/services/usercookies.service';
@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent {
  ActivationForm!: FormGroup;
  product:any;
  BaseUrl = environment.FilebasePath;
  // BaseUrl = 'https://sklife.in/sk-portal/backend/public/storage/';
  purchaseData: { name: any; user_id: number; product_id: any; size: any; price: any; };
  userInfo:any;
  is_activated:boolean=false;
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    private dialog: MatDialog,
    public spinner: NgxSpinnerService,
    private toaster: ToasterService,
    private router: Router,
    public cookiesService: UserCookiesService
  ) {
    this.ActivationForm = this.fb.group({
      size: ["", [Validators.required]],
    });
   }

  ngOnInit(): void {
    this.getProduct();
    this.userInfo = this.cookiesService.getCookie('CurrentUser');
    this.is_activated = this.userInfo.is_active;
  }

  getProduct() {
    this.spinner.show();
    this.api.getProduct().subscribe({
      next: (response: any) => {
        if (response && response.status) {
          this.product = response.data;
          console.log(this.product);
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  Activation(){
    if (this.ActivationForm.invalid) {
      this.toaster.error("Please Select Cloths Size.");
      this.ActivationForm.markAllAsTouched();
      return;
    } else if (this.ActivationForm.valid) {
      if(!this.userInfo.pan_verified){
        this.toaster.error('Please update PAN in kyc before purchasing package');
        return;
      }
      if(this.userInfo.kyc_status != "verified"){
        this.toaster.error('Please update Bank Details in kyc before purchasing package');
        return;
      }
      this.spinner.show();
      this.api.checkActivation().subscribe({
        next: (response: any) => {
          if (response.status === false) {
            this.toaster.success("You have already purchased this product.");
            this.spinner.hide();
            return;
          }
          this.spinner.hide();
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '340px',
            data: {
              title: "Activation",
              message: "Are you sure you want to purchase this Product?",
              btn: "Yes"
            },
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              const purchaseData = {
                name: this.product.name,
                product_id: this.product.id,
                size: this.ActivationForm.value.size,
                price: this.product.price
              };
              var encrypt = this.cookiesService.encrypt(purchaseData);
              this.router.navigate(['/checkout'], { queryParams: { access_token: encrypt } });
            } else {
              console.log('Purchase canceled');
            }
          });
        },
        error: (err) => {
          console.error('Error checking purchase', err);
        }
      });
    }
  }
}
