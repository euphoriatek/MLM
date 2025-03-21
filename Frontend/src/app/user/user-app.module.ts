import { NgModule } from '@angular/core';
// project import
import { UserAppRoutingModule } from './user-app-routing.module';
import { UserAppComponent } from './user-app.component';
import { SharedModule } from '../user/theme/shared/shared.module';
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { NavigationComponent } from './theme/layouts/admin/navigation/navigation.component';
import { NavBarComponent } from './theme/layouts/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layouts/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layouts/admin/nav-bar/nav-right/nav-right.component';
import { NavContentComponent } from './theme/layouts/admin/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './theme/layouts/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './theme/layouts/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './theme/layouts/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavigationItem } from './theme/layouts/admin/navigation/navigation';
import { ConfirmDialogComponent } from 'src/app/user/services/confirm-dialog.component';
// import { InterceptorInterceptor } from './services/interceptor.interceptor';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ToastModule} from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';  
import { MatOptionModule } from '@angular/material/core';
import { MyProfileComponent } from './demo/component/my-profile/my-profile.component';
import { CreateKycComponent } from './demo/component/create-kyc/create-kyc.component';
import { LevelTreeComponent } from './demo/component/level-tree/level-tree.component'; 
import { PanelModule } from 'primeng/panel'; 
import { TreeModule } from 'primeng/tree';
import { ActivationComponent } from './demo/component/activation/activation.component';
import { CheckoutComponent } from './demo/component/checkout/checkout.component';
import { ChangePasswordHistoryComponent } from './demo/component/change-password-history/change-password-history.component';
import { SecurityComponent } from './demo/component/security/security.component';
import { PackageHistoryComponent } from './demo/component/package-history/package-history.component';
import { BankWithdrawalComponent } from './demo/component/bank-withdrawal/bank-withdrawal.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepicker } from '@angular/material/datepicker';
import { TreeTableComponent } from './demo/component/tree-table/tree-table.component';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [
    UserAppComponent,
    AdminComponent,
    GuestComponent,
    NavigationComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavContentComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    ConfirmDialogComponent,
    MyProfileComponent,
    CreateKycComponent,
    LevelTreeComponent,
    ActivationComponent,
    CheckoutComponent,
    ChangePasswordHistoryComponent,
    SecurityComponent,
    PackageHistoryComponent,
    BankWithdrawalComponent,
    TreeTableComponent
  ],
  imports: [UserAppRoutingModule,PanelModule,TreeModule, MatTreeModule,MatIconModule, MatButtonModule,SharedModule,MatDatepickerModule,MatInputModule,MatFormFieldModule,MatNativeDateModule,MatSlideToggleModule,InputTextModule, TableModule,CalendarModule,SliderModule,MultiSelectModule,ContextMenuModule,ToastModule,ConfirmDialogModule,ProgressBarModule,DropdownModule,DialogModule,DialogModule,MatDialogModule,MatSelectModule,MatOptionModule,OrganizationChartModule,MatTabsModule],
  providers: [NavigationItem],
  bootstrap: [UserAppComponent]
})
export class UserAppModule {}