import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './account/registration-form/registration-form.component';
import { AuthGuard } from '../app/auth.guard';
import { HomeComponent } from './userboard/home/home.component';

const routes: Routes = [

{
  path: '',
  component: HomeComponent, canActivate: [AuthGuard]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
