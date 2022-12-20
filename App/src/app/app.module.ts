import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AuthComponent } from './auth/auth.component';
import { SharedComponent } from './shared/shared.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ScanComponent } from './admin/scan/scan.component';
import { ViewStdComponent } from './admin/view-std/view-std.component';
import { ManageStdComponent } from './admin/manage-std/manage-std.component';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MenuComponent } from './shared/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    AuthComponent,
    SharedComponent,
    DashboardComponent,
    ScanComponent,
    ViewStdComponent,
    ManageStdComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavbarComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ScrollPanelModule,
    TableModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
