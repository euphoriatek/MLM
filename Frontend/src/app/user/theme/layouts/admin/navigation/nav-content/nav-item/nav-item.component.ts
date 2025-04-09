// Angular import
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
// Project import
import { NavigationItem } from '../../navigation';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  // public props
  @Input() item!: NavigationItem;
  constructor(public router:Router){
  }
  ngAfterViewInit(): void {
    const route = document.querySelector(`[href="${this.router.url}"]`);
    if (route) {
      if(route.parentElement.parentElement.parentElement.parentElement){
        route.parentElement.parentElement.parentElement.parentElement.classList.add('coded-trigger');
      }
    }
  }
  // public method 
  closeOtherMenu(event) {
    const ele = event.target;
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent.parentElement.parentElement;
      const last_parent = up_parent.parentElement;
      const sections = document.querySelectorAll('.coded-hasmenu');
      for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
        sections[i].classList.remove('coded-trigger');
      }
      if (parent.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
    if ((document.querySelector('app-navigation.coded-navbar') as HTMLDivElement).classList.contains('mob-open')) {
      (document.querySelector('app-navigation.coded-navbar') as HTMLDivElement).classList.remove('mob-open');
    }
  }
}
