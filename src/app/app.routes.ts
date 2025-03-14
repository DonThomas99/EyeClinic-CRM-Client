import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'home',title:'CRM | Home',loadChildren:() => import('./components/home/home.module').then(m =>m.HomeModule)},
    {path:'',redirectTo:'home',pathMatch:'full'}
];
