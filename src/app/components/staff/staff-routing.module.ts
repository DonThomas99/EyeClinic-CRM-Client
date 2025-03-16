import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffLoginComponent } from './staff-login/staff-login.component';

const routes: Routes = [
  {path:'staffLogin',component:StaffLoginComponent},
  {path:'',redirectTo:'staffLogin',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
