import { Routes } from '@angular/router';

export const routes: Routes = [
  //{
  //  path: 'home',
   // loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  //},
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'otp',
    loadComponent: () => import('./pages/otp/otp.page').then( m => m.OtpPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
];
