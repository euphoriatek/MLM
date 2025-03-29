import { Component } from '@angular/core';
import { UserCookiesService } from 'src/app/user/services/usercookies.service';
import { ToasterService } from 'src/app/services/toster.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  Username:any;
  constructor(public toaster:ToasterService,public cookie:UserCookiesService,public route:Router){
   
    this.Username = this.cookie.getCookie('CurrentUser')?.full_name;
  }
  // public method
  profile = [
    {
      icon: 'ti ti-edit-circle',
      title: 'Edit Profile',
      url: '/profile',
    },
    // {
    //   icon: 'ti ti-user',
    //   title: 'View Profile'
    // },
    // {
    //   icon: 'ti ti-clipboard',
    //   title: 'Social Profile'
    // },
    // {
    //   icon: 'ti ti-edit-circle',
    //   title: 'Billing'
    // },
    // {
    //   icon: 'ti ti-power',
    //   title: 'Logout'
    // }
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
