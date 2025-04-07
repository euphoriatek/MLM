// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAppComponent } from './user-app.component';
import { authGuard } from './guard/auth.guard';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { unAuthGuard } from './guard/un-auth.guard';
import { MyProfileComponent } from './demo/component/my-profile/my-profile.component';
import { CreateKycComponent } from './demo/component/create-kyc/create-kyc.component';
import { LevelTreeComponent } from './demo/component/level-tree/level-tree.component';  
import { ActivationComponent } from './demo/component/activation/activation.component';
import { CheckoutComponent } from './demo/component/checkout/checkout.component';
import { ChangePasswordHistoryComponent } from './demo/component/change-password-history/change-password-history.component';
import { SecurityComponent } from './demo/component/security/security.component';
import { PackageHistoryComponent } from './demo/component/package-history/package-history.component';
import { BankWithdrawalComponent } from './demo/component/bank-withdrawal/bank-withdrawal.component';
import { DirectReferralListComponent } from './demo/component/direct-referral-list/direct-referral-list.component';
import { MyDownlineListComponent } from './demo/component/my-downline-list/my-downline-list.component';
import { WalletStatementComponent } from './demo/component/wallet-statement/wallet-statement.component';
import { BankWithdrawalHistoryComponent } from './demo/component/bank-withdrawal-history/bank-withdrawal-history.component';
import { LevelIncomeComponent } from './demo/component/level-income/level-income.component';
import { InvoiceComponent } from './demo/component/invoice/invoice.component';
import { ProfitLevelComponent } from './demo/component/profit-level/profit-level.component';
import { ForgotPasswordComponent } from './demo/component/forgot-password/forgot-password.component';
import { OrderComponent } from './demo/component/order/order.component';
import { HelpDeskComponent } from './demo/component/help-desk/help-desk.component';
const routes: Routes = [
  {
    path: '',
    component: UserAppComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component'),
        canActivate:[authGuard]
      },
      {
        path: 'referral/kyc',
        component:CreateKycComponent,
        canActivate:[authGuard]
      },
      {
        path: 'auth/level-tree',
        component:LevelTreeComponent,
        canActivate:[authGuard]
      },
      {
        path: 'auth/direct-referral-list',
        component:DirectReferralListComponent,
        canActivate:[authGuard]
      },
      {
        path: 'auth/my-downline-list',
        component:MyDownlineListComponent,
        canActivate:[authGuard]
      },
      {
        path: 'profile',
        component: MyProfileComponent,
        canActivate:[authGuard]
      },
      {
        path: 'create-kyc',
        component: CreateKycComponent,
        canActivate:[authGuard]
      },
      {
        path: 'security',
        component: SecurityComponent,
        canActivate:[authGuard]
      },
      {
        path: 'change-password-history',
        component: ChangePasswordHistoryComponent,
        canActivate:[authGuard]
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'activation',
        component: ActivationComponent,
        canActivate:[authGuard]
      },
      {
        path: 'wallet-statement',
        component: WalletStatementComponent,
        canActivate:[authGuard]
      },
      {
        path: 'bank-withdrawal-history',
        component: BankWithdrawalHistoryComponent,
        canActivate:[authGuard]
      },
      {
        path: 'level-income',
        component: LevelIncomeComponent,
        canActivate:[authGuard]
      },
      {
        path: 'package-history',
        component: PackageHistoryComponent,
        // canActivate:[authGuard]
      },
      {
        path: 'bank-withdrawal',
        component: BankWithdrawalComponent,
        // canActivate:[authGuard]
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'profit-level',
        component: ProfitLevelComponent,
        canActivate:[authGuard]
      },
      {
        path: 'track-order',
        component: OrderComponent,
        canActivate:[authGuard]
      },
      {
        path: 'help-desk',
        component: HelpDeskComponent,
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
        canActivate:[unAuthGuard]
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
          .then(m => m.RegisterComponent),
        // canActivate: [unAuthGuard]
      },
      {
        path: 'register/:id',
        loadComponent: () => import('./demo/authentication/register/register.component')
          .then(m => m.RegisterComponent),
        // canActivate: [unAuthGuard]
      },
      { 
        path: 'forgot-password',
         component: ForgotPasswordComponent
      },
      {
        path: 'invoice/:id',
        component: InvoiceComponent,
        canActivate:[authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAppRoutingModule {}
