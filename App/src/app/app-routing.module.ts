import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './rmutt/dashboard/dashboard.component';
import { RmuttComponent } from './rmutt/rmutt.component';

const routes: Routes = [
  { path: '', redirectTo: 'rmutt/auth', pathMatch: 'full' },
  {
    path: 'rmutt/auth',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'rmutt',
    component: RmuttComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
