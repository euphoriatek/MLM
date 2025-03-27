import { Component } from '@angular/core';
import { ApiService } from 'src/app/admin/services/api.service';
import { AdminCookiesService } from 'src/app/admin/services/admincookies.service';
import { CommonModule } from '@angular/common';
import { ToasterService } from 'src/app/services/toster.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent {
  role:string;
  BaseUrl = environment.baseURL;
  sponserId:any;
  ReferralUrl:string;
  UserInfo:any;
  constructor(private api: ApiService,public spinner: NgxSpinnerService, public adminCookieService:AdminCookiesService,private toaster: ToasterService,private router: Router) { }

  ngOnInit(): void {
    this.role = this.adminCookieService.getCookie('AdminUser')?.role;
    this.sponserId = this.adminCookieService.getCookie('AdminUser')?.sponsor_id;
    this.ReferralUrl = this.BaseUrl + 'Register/' + this.sponserId;
    this.getInfo();
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
}
