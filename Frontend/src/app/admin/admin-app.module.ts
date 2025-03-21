// angular import
import { NgModule } from '@angular/core';


// project import
import { AdminAppRoutingModule } from './admin-app-routing.module';
import { AdminAppComponent } from './admin-app.component';
import { SharedModule } from './theme/shared/shared.module';
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

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from "primeng/button"; 
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from 'src/app/admin/services/confirm-dialog.component';

import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ToastModule} from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';

// MLM
import { AddProductComponent } from './demo/component/add-product/add-product.component';
import { ProductListComponent } from './demo/component/product-list/product-list.component';
import { OrdersComponent } from './demo/component/orders/orders.component';
import { CommissionsComponent } from './demo/component/commissions/commissions.component';
import { TransactionComponent } from './demo/component/transaction/transaction.component';
import { PaymentsComponent } from './demo/component/payments/payments.component';
import { WithdrawalListingComponent } from './demo/component/withdrawal-listing/withdrawal-listing.component';
@NgModule({
  declarations: [
    AdminAppComponent,
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
    AddProductComponent,
    ProductListComponent,
    OrdersComponent,
    CommissionsComponent,
    TransactionComponent,
    PaymentsComponent,
    WithdrawalListingComponent
  ],
  imports: [AdminAppRoutingModule, SharedModule,MatDatepickerModule,MatInputModule,MatFormFieldModule,MatNativeDateModule,MatSlideToggleModule,MatSelectModule,DialogModule,ButtonModule,InputTextModule,MatDialogModule,MatButtonModule,
    TableModule,CalendarModule,SliderModule,MultiSelectModule,ContextMenuModule,ToastModule,ProgressBarModule,DropdownModule
  ],
  providers: [NavigationItem],
  bootstrap: [AdminAppComponent]
})
export class AdminAppModule {}
