import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';
import { LoginPage } from './login/login.page';
import { RegistrationPage } from './registration/registration.page';
import { AuthService } from '../services/auth.service';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '', redirectTo: '/auth/login', pathMatch: 'full'
  },
  {
    path: "", component: AuthPage,
    children: [
      {
        path: 'login', component: LoginPage
      },
      {
        path: 'registration', component: RegistrationPage
      }
    ]
  }
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [AuthPage, LoginPage, RegistrationPage],
  providers: [AuthService, ]
})
export class AuthPageModule {}
