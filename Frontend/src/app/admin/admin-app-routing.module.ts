// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAppComponent } from './admin-app.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { authGuard } from './guard/auth.guard';
import { AddProductComponent } from './demo/component/add-product/add-product.component';
import { ProductListComponent } from './demo/component/product-list/product-list.component';
import { CommissionsComponent } from './demo/component/commissions/commissions.component';
import { TransactionComponent } from './demo/component/transaction/transaction.component';
import { PaymentsComponent } from './demo/component/payments/payments.component';
import { WithdrawalListingComponent } from './demo/component/withdrawal-listing/withdrawal-listing.component';
import { TreeViewComponent } from './demo/component/tree-view/tree-view.component';
import { MembersListComponent } from './demo/component/members-list/members-list.component';
import { OrdersComponent } from './demo/component/orders/orders.component';
import { LevelIncomeComponent } from './demo/component/level-income/level-income.component';
import { WalletStatementComponent } from './demo/component/wallet-statement/wallet-statement.component';
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
      {
        path: 'commissions',
        component: CommissionsComponent,
        canActivate:[authGuard]
      },
      {
        path: 'transaction',
        component: TransactionComponent,
        canActivate:[authGuard]
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        canActivate:[authGuard]
      },
      {
        path: 'withdrawal-listing',
        component:WithdrawalListingComponent,
        canActivate:[authGuard]
      },
      {
        path: 'tree-view',
        component: TreeViewComponent,
        canActivate:[authGuard]
      },
      {
        path: 'members-list',
        component: MembersListComponent,
        canActivate:[authGuard]
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate:[authGuard]
      },
      {
        path: 'level-income',
        component: LevelIncomeComponent,
        canActivate:[authGuard]
      },
      {
        path: 'wallet-statement',
        component: WalletStatementComponent,
        canActivate:[authGuard]
      }
      
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
