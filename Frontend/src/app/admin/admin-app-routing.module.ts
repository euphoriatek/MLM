// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAppComponent } from './admin-app.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { authGuard } from './guard/auth.guard';
import { AddProductComponent } from './demo/component/add-product/add-product.component';
import { ProductListComponent } from './demo/component/product-list/product-list.component';
const routes: Routes = [
  {
    path: '',
    component: AdminAppComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component'),
        canActivate:[authGuard]
      },
      {
        path: 'new_product',
        component: AddProductComponent,
        canActivate:[authGuard]
      },
      {
        path: 'product_list',
        component: ProductListComponent,
        canActivate:[authGuard]
      },
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component'),
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAppRoutingModule {}
