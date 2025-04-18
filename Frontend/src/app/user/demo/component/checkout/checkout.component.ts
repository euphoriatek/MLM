import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/user/services/api.service';
import { UserCookiesService } from 'src/app/user/services/usercookies.service';
import { ToasterService } from 'src/app/services/toster.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DataShareService } from 'src/app/user/services/data-share.service';
declare var Razorpay: any;
import { ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import type {
  FireworksDirective,
  FireworksOptions
} from '@fireworks-js/angular';
import { error } from 'console';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent {
  product_data: any;
  CheckoutForm: any;
  Activation_success: boolean = false;
  otpTimer: number = 3;
  user: any;
  timerInterval: any;
  enabled = false;
  order:any;
  options: FireworksOptions = {
    opacity: 0.5,
    sound: {
      enabled:true,
      files: ['assets/images/activation.mp3'],
      volume: {
        min: 4,
        max: 8
      }
    }
  }
  pin_isValid:boolean=false;
  @ViewChild('fireworks') fireworks?: FireworksDirective
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public api: ApiService,
    public fb: FormBuilder,
    public toaster: ToasterService,
    public spinner: NgxSpinnerService,
    public cookiesService: UserCookiesService, public cdRef: ChangeDetectorRef, private service: DataShareService) {
    this.route.queryParams.subscribe(params => {
      this.product_data = params['access_token'];
    });
  }
ngOnInit(): void {
  this.getInfo();

  var decrypt = this.cookiesService.decrypt(this.product_data);
  this.product_data = JSON.parse(decrypt);
  this.user = this.cookiesService.getCookie("CurrentUser");

  this.CheckoutForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    phone_number: ['', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]],
    address: ['', Validators.required],
    pin_code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  // Set values from user
  this.CheckoutForm.patchValue({
    name: this.user.full_name,
    email: this.user.email,
    phone_number: this.user.mobile_no,
    address: this.user.address,
    pin_code: this.user.pin_code,
  });

  // Now check serviceability after setting the pin code
  this.checkServiceability();
}


  getInfo(){
    this.spinner.show();
    this.api.getAuth().subscribe({
      next: (response: any) => {
        if (response.status) {
          this.user = response.data;
          this.cookiesService.updateCookie('CurrentUser', 'is_active', this.user.is_active);
          if (this.user.is_active) {
            this.router.navigate(['/activation']);
          }
        }
        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
        console.error(err);
      }
    });
  }

  Checkout(): void {
    if (this.CheckoutForm.invalid) {
      this.CheckoutForm.markAllAsTouched();
      return;
    } else if (this.CheckoutForm.valid && this.pin_isValid) {
      const formData = this.CheckoutForm.value;
      const orderData = {
        product_id: this.product_data.product_id,
        size: this.product_data.size,
        price: this.product_data.price,
        name: this.product_data.name,
        delivery_address: this.CheckoutForm.value,
        currency: 'INR',
        user_email: formData.email,
        amount: this.product_data.price,
      };
      this.spinner.show();
      this.api.createOrder(orderData).subscribe(
        (response: any) => {
          if(response.status){
            this.order = response.data;
            this.spinner.hide();
            const options = {
              key: environment.RazorpayApiKey,
              amount: this.product_data.price * 100,
              currency: 'INR', 
              name: this.product_data.name,
              description: `Checkout for ${this.product_data.name}`,
              order_id:this.order.razor_order_id,
              handler: (paymentResponse: any) => {
                if(paymentResponse.razorpay_payment_id){
                this.spinner.show();
                this.api.checkPlanIsActive().subscribe({
                  next: (response: any) => {
                    this.spinner.hide();
                    if (response.status) {
                      this.Activation_success = true;
                      this.enabled =true;
                      this.cdRef.detectChanges();
                      this.cookiesService.updateCookie("CurrentUser", "is_active", true);
                      this.service.updateProfileInfo(true);
                    }else{
                      this.toaster.error(response.message);
                      this.router.navigate(['/activation']);
                    }
                  }
                });
                // const orderData = {
                //   product_id: this.product_data.product_id,
                //   size: this.product_data.size,
                //   price: this.product_data.price,
                //   name: this.product_data.name,
                //   delivery_address: this.CheckoutForm.value,
                //   r_payment_id: paymentResponse.razorpay_payment_id,
                //   method: 'razorpay',
                //   currency: options.currency,
                //   user_email: formData.email,
                //   amount: options.amount / 100,
                //   json_response: JSON.stringify(paymentResponse),
                // };
                //   this.api.checkOutActivation(orderData).subscribe(
                //     (response: any) => {
                //       this.spinner.hide();
                //       if (response.status) {
                //         this.Activation_success = true;
                //         this.enabled =true;
                //         this.cdRef.detectChanges();
                //         this.cookiesService.updateCookie("CurrentUser", "is_active", true);
                //         this.service.updateProfileInfo(true);
                //       } else {
                //         this.toaster.error(response.message);
                //         this.router.navigate(['/activation']);
                //       }
                //     },
                //     (error) => {
                //       console.error('Error Processing Purchase and Payment:', error);
                //       this.spinner.hide();
                //       this.router.navigate(['/activation']);
                //     }
                //   );
                }
              },
              prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.phone_number,
              },
              theme: {
                "color": "#F37254"
              },
              method: {
                paylater: false
              }
            };
            const rzp1 = new Razorpay(options);
            rzp1.open();
          }else{
            this.router.navigate(['/activation']);
          }
          this.spinner.hide();
        },
        (error) => {
          console.error('Error Processing Purchase and Payment:', error);
          this.spinner.hide();
          this.router.navigate(['/activation']);
        }
      );
    } else {
      console.log('Form is Invalid');
    }
  }

  resetForm() {

  }
  loadTractOrder() {
    this.router.navigate(['/activation']).then(() => {
      window.location.reload();
    });
  }

  checkServiceability() {
    const pincode = this.CheckoutForm.get('pin_code')?.value;
    if (pincode && pincode.length < 6) {
      this.pin_isValid = false;
      return;
    }else{
      this.api.checkServiceability(pincode).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.pin_isValid = true;
            // this.toaster.success(response.message || "Service Delivered in PIN.");
          } else {
            this.pin_isValid = false;
            this.toaster.error(response.message || "Invalid PIN. Service not Delivered.");
          }
        },
        error: (err) => {
          this.pin_isValid = false;
          const message = err?.error?.message || "Something went wrong. Please Try Again.";
          this.toaster.error(message);
        }
      });
    }
  }
  
}
