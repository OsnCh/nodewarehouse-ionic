import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LogOutAuthGuard } from './core/guards/logOutAuth.guard';
import { LogInAuthGuard } from './core/guards/logInAuth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule', canActivate: [LogOutAuthGuard] },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'basket', loadChildren: './basket/basket.module#BasketPageModule', canActivate: [LogInAuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
