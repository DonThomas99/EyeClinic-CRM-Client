import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OptometristListComponent } from './optometrist-list/optometrist-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { BrandListComponent } from './brand-list/brand-list.component';

const routes: Routes = [
  {path:'',redirectTo:'adminLogin',pathMatch:'full'},
  {path:'adminLogin',component:AdminLoginComponent},
  {path:'adminDashboard', component:AdminDashboardComponent},
  {path:'productList', component:ProductListComponent},
  {path:'customerList',component:CustomerlistComponent},
  {path:'orderList',component:OrderListComponent},
  {path:'optometristList',component:OptometristListComponent},
  {path:'staffList', component:StaffListComponent},
  {path:'categoryList',component:CategoryListComponent},
  {path:'brandList',component:BrandListComponent},
  {path:'home',title:'CRM | Home',loadChildren:() => import('../home/home.module').then(m =>m.HomeModule)},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
