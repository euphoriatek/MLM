// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ActivationComponent } from './user/demo/component/activation/activation.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouteInterceptor } from './services/route.interceptor';
import { AdminInterceptor } from './admin/services/admin.interceptor';
import { UserInterceptor } from './user/services/user.interceptor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    // ActivationComponent
    // AdminComponent,
    // GuestComponent,
    // NavigationComponent,
    // NavBarComponent,
    // NavLeftComponent,
    // NavRightComponent,
    // NavContentComponent,
    // NavCollapseComponent,
    // NavGroupComponent,
    // NavItemComponent
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule,NgxSpinnerModule,ToastrModule.forRoot({closeButton:true,preventDuplicates:true,maxOpened: 1,autoDismiss: true}),FormsModule, CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RouteInterceptor,
      multi: true, 
    },
    AdminInterceptor,
    UserInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
