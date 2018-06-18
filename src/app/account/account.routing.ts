import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { RegistrationFormComponent }    from './registration-form/registration-form.component';
import { LoginFormComponent }    from './login-form/login-form.component';
import { UsersComponent }    from 'src/app/users/users.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'registration', component: RegistrationFormComponent},
  { path: 'login', component: LoginFormComponent}
]);