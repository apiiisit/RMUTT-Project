import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasAuthGuard } from './guard/has-auth.guard';
import { HasRoleGuard } from './guard/has-role.guard';
import { AdminComponent } from './rmutt/admin/admin.component';
import { DashboardComponent } from './rmutt/admin/dashboard/dashboard.component';
import { GraduationRehearsalComponent } from './rmutt/admin/graduation-rehearsal/graduation-rehearsal.component';
import { ManageRfidComponent } from './rmutt/admin/manage-rfid/manage-rfid.component';
import { ManageStdComponent } from './rmutt/admin/manage-std/manage-std.component';
import { CheckRfidComponent } from './rmutt/admin/check-rfid/check-rfid.component';
import { VerifyDocumentComponent } from './rmutt/admin/verify-document/verify-document.component';
import { ViewStdComponent } from './rmutt/admin/view-std/view-std.component';
import { AdminLoginComponent } from './rmutt/auth/admin-login/admin-login.component';
import { AuthComponent } from './rmutt/auth/auth.component';
import { UserLoginComponent } from './rmutt/auth/user-login/user-login.component';
import { CheckComponent } from './rmutt/user/check/check.component';
import { DetailComponent } from './rmutt/user/detail/detail.component';
import { UploadComponent } from './rmutt/user/upload/upload.component';
import { UserComponent } from './rmutt/user/user.component';
import { PageNotAppComponent } from './shared/page-not-app/page-not-app.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HistoryEventComponent } from './rmutt/admin/history-event/history-event.component';
import { SettingComponent } from './shared/setting/setting.component';
import { ManageDocumentComponent } from './rmutt/admin/manage-document/manage-document.component';
import { ScanPointComponent } from './rmutt/admin/scan-point/scan-point.component';
import { HistoryPointComponent } from './rmutt/admin/history-point/history-point.component';
import { ViewStdDocComponent } from './rmutt/admin/view-std-doc/view-std-doc.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth', component: AuthComponent,
    children: [
      { path: '', component: UserLoginComponent },
      { path: 'admin', component: AdminLoginComponent }
    ]
  },
  {
    path: 'user', component: UserComponent,
    canActivate: [HasAuthGuard, HasRoleGuard],
    data: { role: 'user' },
    children: [
      { path: '', component: DetailComponent },
      { path: 'check', component: CheckComponent },
      { path: 'upload', component: UploadComponent }
    ]
  },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [HasAuthGuard, HasRoleGuard],
    data: { role: 'admin' },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'check-rfid', component: CheckRfidComponent },
      { path: 'view', component: ViewStdComponent },
      { path: 'manage/std', component: ManageStdComponent },
      { path: 'manage/rfid', component: ManageRfidComponent },
      { path: 'manage/rfid/:id', component: ManageRfidComponent },
      { path: 'manage/document', component: ManageDocumentComponent },
      { path: 'verify/document', component: VerifyDocumentComponent },
      { path: 'verify/document/stdlist/:docid', component: ViewStdDocComponent },
      { path: 'verify/document/:docid', component: VerifyDocumentComponent },
      { path: 'notapp', component: PageNotAppComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'graduation-rehearsal', component: GraduationRehearsalComponent },
      { path: 'graduation-rehearsal/:eventid', component: GraduationRehearsalComponent },
      { path: 'graduation-rehearsal/history-event/:eventid', component: HistoryEventComponent },
      { path: 'graduation-rehearsal/history-point/:pointid', component: HistoryPointComponent },
      { path: 'graduation-rehearsal/scan-point/:pointid', component: ScanPointComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
