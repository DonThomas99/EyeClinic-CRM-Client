import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'',redirectTo:'userLogin',pathMatch:'full'},
  {path:'userLogin',component:UserLoginComponent},
  {path:'userDashboard',component:UserDashboardComponent},
  {path:'home',title:'CRM | Home',loadChildren:() => import('../home/home.module').then(m =>m.HomeModule)},
  {path:'signup',title:'CRM | Signup',component:SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
