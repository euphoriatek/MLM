import { Component } from '@angular/core';
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
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent {
  product_data:any;
  CheckoutForm: any;
  Activation_success:boolean=false;
  otpTimer:number = 3;
  user:any;
  timerInterval: any; 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public api: ApiService,
    public fb: FormBuilder,
    public toaster: ToasterService,
    public spinner: NgxSpinnerService,
    public cookiesService: UserCookiesService,public cdRef:ChangeDetectorRef,private service: DataShareService) {
    this.route.queryParams.subscribe(params => {
      this.product_data = params['access_token'];
    });
  }
  ngOnInit(): void {
    var decrypt = this.cookiesService.decrypt(this.product_data);
    this.product_data = JSON.parse(decrypt);
    this.user = this.cookiesService.getCookie("CurrentUser");
    if(this.user.is_active){
      this.router.navigate(['/activation']);
    }
    this.CheckoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone_number: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],
      address: ['', Validators.required],
      pin_code: ['', Validators.required],
    });

    this.CheckoutForm.patchValue({
      name: this.user.full_name,
      email: this.user.email,
      phone_number: this.user.mobile_no ,
      address: this.user.address,
      pin_code: this.user.pin_code,
    });
    
  }

  Checkout(): void {
    if (this.CheckoutForm.invalid) {
      this.CheckoutForm.markAllAsTouched();
      return;
    } else if (this.CheckoutForm.valid) {
      const formData = this.CheckoutForm.value;
          const options = {
            key:environment.RazorpayApiKey,
            amount: this.product_data.price * 100,
            currency: 'INR',
            name: this.product_data.name,
            description: `Checkout for ${this.product_data.name}`,
            handler: (paymentResponse: any) => {
              console.log(paymentResponse);
              this.spinner.show();
              const orderData = {
                product_id: this.product_data.product_id,
                size: this.product_data.size,
                price: this.product_data.price,
                name: this.product_data.name,
                delivery_address: this.CheckoutForm.value,
                r_payment_id: paymentResponse.razorpay_payment_id,
                method: 'razorpay',
                currency: options.currency,
                user_email: formData.email,
                amount: options.amount / 100,
                json_response: JSON.stringify(paymentResponse),
              };
              this.api.checkOutActivation(orderData).subscribe(
                (response: any) => {
                  this.spinner.hide();
                  if(response.status){
                    this.Activation_success = true;
                    this.cdRef.detectChanges();
                    this.cookiesService.updateCookie("CurrentUser", "is_active", true);
                    this.service.updateProfileInfo(true);
                    this.timerInterval = setInterval(() => {
                      if (this.otpTimer > 0) {
                        this.otpTimer--;
                        this.cdRef.detectChanges();
                        if(this.otpTimer === 0){
                          this.router.navigate(['/activation']);
                        }
                      }
                    }, 1000);
                  }else{
                    this.toaster.error(response.message);
                    this.router.navigate(['/activation']);
                  }
                  // this.spinner.hide();
                },
                (error) => {
                  console.error('Error processing purchase and payment:', error);
                  this.spinner.hide();
                  this.router.navigate(['/activation']);
                }
              );
            },
            prefill: {
              name: formData.name,
              email: formData.email,
              contact: formData.phone_number,
            },
            theme: {
                "color": "#F37254"
            }
          };

          const rzp1 = new Razorpay(options);
          rzp1.open();
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm() {

  }

}
