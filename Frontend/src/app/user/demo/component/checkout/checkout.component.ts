import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/user/services/api.service';
declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent {
  purchaseData: any;
  userInformation = {
    name: '',
    address: '',
    phone: ''
  };
  CheckoutForm: any;

  constructor(private router: Router, private route: ActivatedRoute,public api: ApiService, public fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      const productId = params['id'];
      this.purchaseData = this.getProductDataById(productId);
    });
  }

  ngOnInit(): void {
    this.CheckoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],  
      phone_number: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')  
      ]],
      address: ['', Validators.required],
      pin_code: ['', Validators.required],
      alternate_phone_no: [''],
    });
  }

  getProductDataById(productId: number) {
    return this.purchaseData || {};
  }

  // openRazorpayDialog() {
  //   const options = {
  //     key: 'rzp_test_er0Zna0Q1TQrgL', 
  //     amount: this.purchaseData.price * 100,
  //     currency: 'INR',
  //     name: this.purchaseData.name,
  //     description: `Purchase of ${this.purchaseData.name}`,
  //     handler: (response: any) => {
  //       console.log('Payment successful:', response);
  //     }
  //   };
  //   const rzp1 = new Razorpay(options);
  //   rzp1.open();
  // }

  Checkout(): void {
    if (this.CheckoutForm.valid) {
      const formData = this.CheckoutForm.value;
  
      this.api.CreateDeliveryAddress(formData).subscribe(
        (response: any) => {
          this.CheckoutForm.reset();
          const options = {
            key: 'rzp_test_er0Zna0Q1TQrgL',
            amount: 100000,  
            currency: 'INR',
            name: 'Product Purchase',
            description: `Checkout for ${response.product_name}`,
            handler: (paymentResponse: any) => {
              console.log('testing');
              console.log('Payment successful:', paymentResponse);
            },
            prefill: {
              name: formData.name,
              email: formData.email,
              contact: formData.phone_number
            }
          };
          const rzp1 = new Razorpay(options);
          rzp1.open();
        },
        (error) => {
          console.error('Error saving delivery address:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
  
  resetForm(){
    
  }

}
