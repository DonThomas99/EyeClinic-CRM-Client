import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptometristLoginComponent } from './optometrist-login/optometrist-login.component';

const routes: Routes = [
  {path:'',redirectTo:'optmetristLogin',pathMatch:'full'},
  {path:'optmetristLogin',component:OptometristLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptometristRoutingModule { }
