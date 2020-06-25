import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ForgotComponent } from '../../pages/forgot/forgot.component';
import { ResetComponent } from '../../pages/reset/reset.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'forgot',         component: ForgotComponent},
    { path: 'reset/:token',    component: ResetComponent}
];
