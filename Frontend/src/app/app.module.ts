import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

// pipe
import { DateThaiPipe } from './pipe/date-thai.pipe';

// auth
import { AuthComponent } from './rmutt/auth/auth.component';
import { UserLoginComponent } from './rmutt/auth/user-login/user-login.component';
import { AdminLoginComponent } from './rmutt/auth/admin-login/admin-login.component';

// admin
import { AdminComponent } from './rmutt/admin/admin.component';
import { DashboardComponent } from './rmutt/admin/dashboard/dashboard.component';
import { CheckRfidComponent } from './rmutt/admin/check-rfid/check-rfid.component';
import { ViewStdComponent } from './rmutt/admin/view-std/view-std.component';
import { ManageStdComponent } from './rmutt/admin/manage-std/manage-std.component';
import { ManageRfidComponent } from './rmutt/admin/manage-rfid/manage-rfid.component';
import { GraduationRehearsalComponent } from './rmutt/admin/graduation-rehearsal/graduation-rehearsal.component';
import { VerifyDocumentComponent } from './rmutt/admin/verify-document/verify-document.component';
import { HistoryEventComponent } from './rmutt/admin/history-event/history-event.component';
import { ManageDocumentComponent } from './rmutt/admin/manage-document/manage-document.component';
import { ScanPointComponent } from './rmutt/admin/scan-point/scan-point.component';

// user
import { UserComponent } from './rmutt/user/user.component';
import { DetailComponent } from './rmutt/user/detail/detail.component';
import { CheckComponent } from './rmutt/user/check/check.component';
import { UploadComponent } from './rmutt/user/upload/upload.component';

// shared
import { MenuComponent } from './shared/menu/menu.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { PageNotAppComponent } from './shared/page-not-app/page-not-app.component';
import { SettingComponent } from './shared/setting/setting.component';

// dialog
import { ImportStdDialogComponent } from './dialog/import-std-dialog/import-std-dialog.component';
import { StdDialogComponent } from './dialog/std-dialog/std-dialog.component';
import { SettingDialogComponent } from './dialog/setting-dialog/setting-dialog.component';
import { EventDialogComponent } from './dialog/event-dialog/event-dialog.component';
import { EventEditDialogComponent } from './dialog/event-edit-dialog/event-edit-dialog.component';
import { DocDialogComponent } from './dialog/doc-dialog/doc-dialog.component';
import { PointDialogComponent } from './dialog/point-dialog/point-dialog.component';
import { PointEditDialogComponent } from './dialog/point-edit-dialog/point-edit-dialog.component';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { TreeModule } from 'primeng/tree';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { HistoryPointComponent } from './rmutt/admin/history-point/history-point.component';
import { ViewStdDocComponent } from './rmutt/admin/view-std-doc/view-std-doc.component';
import { ScanStatusPipe } from './pipe/scan-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserLoginComponent,
    AdminLoginComponent,
    AdminComponent,
    DashboardComponent,
    CheckRfidComponent,
    ViewStdComponent,
    ManageStdComponent,
    ManageRfidComponent,
    UserComponent,
    DetailComponent,
    CheckComponent,
    UploadComponent,
    MenuComponent,
    NavbarComponent,
    PageNotFoundComponent,
    PageNotAppComponent,
    ImportStdDialogComponent,
    StdDialogComponent,
    GraduationRehearsalComponent,
    VerifyDocumentComponent,
    SettingDialogComponent,
    EventDialogComponent,
    EventEditDialogComponent,
    HistoryEventComponent,
    DateThaiPipe,
    SettingComponent,
    ManageDocumentComponent,
    DocDialogComponent,
    PointDialogComponent,
    PointEditDialogComponent,
    ScanPointComponent,
    HistoryPointComponent,
    ViewStdDocComponent,
    ScanStatusPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    ScrollPanelModule,
    FieldsetModule,
    CardModule,
    TableModule,
    DialogModule,
    ToolbarModule,
    PaginatorModule,
    ImageModule,
    FileUploadModule,
    MultiSelectModule,
    InputMaskModule,
    KeyFilterModule,
    PanelModule,
    MenuModule,
    TreeModule,
    RadioButtonModule,
    CalendarModule,
    InputSwitchModule,
    InputNumberModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
