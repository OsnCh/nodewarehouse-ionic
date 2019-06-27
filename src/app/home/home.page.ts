import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/aunthefication.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

const menuId = 'menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 
  public title: string;

  constructor(public autheficationService: AuthenticationService,
    private router: Router,
    public route:ActivatedRoute,
    private menuController: MenuController) { }

  ngOnInit() {
    this.setTitle();
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.setTitle();
      }
    })
  }

  private setTitle(){
    this.menuController.close(menuId);
    this.title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
    console.log(this.title);
  }

  private getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  public navigateToBasket(){
    this.router.navigate(['/basket'], { queryParams: { returnUrl: this.router.url } });
  }

  

}
