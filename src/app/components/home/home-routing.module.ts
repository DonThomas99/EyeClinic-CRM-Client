import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'admin',title:'CRM | Admin',loadChildren:() => import('../admin/admin.module').then(m => m.AdminModule)},
  {path:'staff',title:'CRM | Staff',loadChildren:() => import('../staff/staff.module').then(m => m.StaffModule)},
  {path:'optometrist',title:'CRM | Optometrist',loadChildren:() => import('../optometrist/optometrist.module').then(m => m.OptometristModule)},
  {path:'user',title:'CRM | User',loadChildren:() => import('../user/user.module').then((m => m.UserModule))},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
