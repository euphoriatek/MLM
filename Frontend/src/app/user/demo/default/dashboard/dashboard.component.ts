// angular import
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/user/services/api.service';
import { SharedModule } from 'src/app/user/theme/shared/shared.module';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserCookiesService } from 'src/app/user/services/usercookies.service';
import { ToasterService } from 'src/app/services/toster.service';
import { Router } from '@angular/router';
@Component({   
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
  BaseUrl = environment.baseURL;
  sponserId:any;
  ReferralUrl:string;
  UserInfo:any;
  constructor(public spinner: NgxSpinnerService, public api: ApiService, public cookie:UserCookiesService,private toaster: ToasterService,private router: Router) {
  }
  ngOnInit(): void {
    this.sponserId = this.cookie.getCookie('CurrentUser')?.sponsor_id;
    this.ReferralUrl = this.BaseUrl + 'register/' + this.sponserId;
    this.getInfo();
  }
  getInfo(){
    this.spinner.show();
    this.api.getAuth().subscribe({
      next: (response: any) => {
        if (response.status) {
          this.UserInfo = response.data; 
        }
        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
        console.error(err);
      }
    });
  }
  copyUrl(){
    navigator.clipboard.writeText(this.ReferralUrl);
    this.toaster.success(this.ReferralUrl, 'Copied');
  }
 
  redirectUrl() {
    const fullUrl = this.ReferralUrl;
    const referralCode = fullUrl.split('/').pop();
    this.router.navigate(['/register'], { queryParams: { referral: referralCode } });
  }
  
}
