import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `<ion-content>
              <ion-router-outlet></ion-router-outlet>
             </ion-content>`
})
export class AuthPage{
  constructor() { }
}
