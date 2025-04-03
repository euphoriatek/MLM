import { Component } from '@angular/core';
import { UserCookiesService } from 'src/app/user/services/usercookies.service';
import { ToasterService } from 'src/app/services/toster.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataShareService } from 'src/app/user/services/data-share.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from 'src/app/user/services/api.service';
@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  Username:any;
  image:any;
  User:any;
  BaseUrl = environment.baseURL;
  BaseUrlFile = environment.FilebasePath;
  private subscription: Subscription;
  constructor(public toaster:ToasterService,public cookie:UserCookiesService,public route:Router,private service: DataShareService, public spinner:NgxSpinnerService,
    private api: ApiService
  ){
    this.User = this.cookie.getCookie('CurrentUser');
    this.image = this.User.image ? `${this.BaseUrlFile}${this.User.image}` : null;
    this.subscription = this.service.user$.subscribe((status) => {
      if(status){
        this.User = this.cookie.getCookie('CurrentUser');
        this.image = this.User.image ? `${this.BaseUrlFile}${this.User.image}` : null;
      }
    });
  }
  // public method
  profile = [
    {
      icon: 'ti ti-edit-circle',
      title: 'Edit Profile',
      url: 'profile',
    },
  ];

  setting = [
    {
      icon: 'ti ti-help',
      title: 'Support'
    },
    {
      icon: 'ti ti-user',
      title: 'Account Settings'
    },
    {
      icon: 'ti ti-lock',
      title: 'Privacy Center'
    },
    {
      icon: 'ti ti-messages',
      title: 'Feedback'
    },
    {
      icon: 'ti ti-list',
      title: 'History'
    }
  ];

  logOut(){
    sessionStorage.clear();
    localStorage.clear();
    this.cookie.deleteCookieAll();
    this.cookie.deleteCookie('CurrentUser');
    this.toaster.success("Logout successfully!", "Logout");
    this.route.navigate(['/login']);
  }
}
