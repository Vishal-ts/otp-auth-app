import { Routes } from '@angular/router';
import { RegisterPage } from './pages/register/register.page'; 
export const routes: Routes = [
  {
    path: '',
    component: RegisterPage  
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'otp',
    loadComponent: () => import('./pages/otp/otp.page').then(m => m.OtpPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
  }
];
