import { Component } from '@angular/core';
import { ApiService } from 'src/app/user/services/api.service';
import { ToasterService } from 'src/app/services/toster.service';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { UserCookiesService } from 'src/app/user/services/usercookies.service';
import { Timeline } from 'primeng/timeline';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  order:any;
  events: EventItem[];
  constructor(private api: ApiService,public toaster: ToasterService, public spinner: NgxSpinnerService){
    
  }
  ngOnInit() {
    this.getOrder();
  }
 
  getOrder() {
    this.spinner.show();
    this.api.getOrder().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.order = response.data?.ShipmentData[0].Shipment;
          console.log(this.order);
          if(this.order.Status?.Status === "Manifested" && this.order.Status?.StatusCode === "X-UCI"){
            var date = this.order.Scans[0].ScanDetail.ScanDateTime;
            this.events = [
              { label:'Ready To Ship',status: 'Ordered', date: date, icon: 'fa-solid fa-dolly', color: '#9C27B0', image: 'game-controller.jpg', styleClass:"reached" },
              { label:'Scheduled for Pickup',status: 'ScheduledforPickup', date: '', icon: 'fa-solid fa-truck-pickup', color: '#673AB7', styleClass:""  },
              { label:'In-transit',status: 'Shipped', date: '', icon: 'fa-solid fa-truck-fast', color: '#FF9800' , styleClass:"" },
              { label:'Out for delivery',status: 'Outfordelivery', date: '', icon: 'fa-solid fa-truck', color: '#607D8B' , styleClass:"" },
              { label:'Delivered',status: 'Delivered', date: '', icon: 'fa-solid fa-check-to-slot', color: '#607D8B', styleClass:""  }
          ];
          }else if(this.order.Status?.Status === "Manifested" && this.order.Status?.StatusCode === "DTUP-203"){
var date = this.order.Scans[0].ScanDetail.ScanDateTime;
            this.events = [
              { label:'Ready To Ship',status: 'Ordered', date: date, icon: 'fa-solid fa-dolly', color: '#9C27B0', image: 'game-controller.jpg', styleClass:"reached" },
              { label:'Scheduled for Pickup',status: 'ScheduledforPickup', date: '', icon: 'fa-solid fa-truck-pickup', color: '#673AB7', styleClass:""  },
              { label:'In-transit',status: 'Shipped', date: '', icon: 'fa-solid fa-truck-fast', color: '#FF9800' , styleClass:"" },
              { label:'Out for delivery',status: 'Outfordelivery', date: '', icon: 'fa-solid fa-truck', color: '#607D8B' , styleClass:"" },
              { label:'Delivered',status: 'Delivered', date: '', icon: 'fa-solid fa-check-to-slot', color: '#607D8B', styleClass:""  }
          ];
          }
          
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }
}
interface EventItem {
  label:string;
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
  styleClass:any;
}