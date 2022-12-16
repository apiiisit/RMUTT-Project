import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AuthComponent } from './auth/auth.component';
import { SharedComponent } from './shared/shared.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ScanComponent } from './admin/scan/scan.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    AuthComponent,
    SharedComponent,
    PageNotFoundComponent,
    DashboardComponent,
    ScanComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
