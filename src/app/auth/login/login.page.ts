import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignInAuthModel } from 'src/app/shared/models/auth/signIn.model';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthenticationService } from 'src/app/services/aunthefication.service';
import { PopupService } from 'src/app/services/popup.service';
import { TokenAuthModel } from 'src/app/shared/models/auth/tokenAuth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginGroup: FormGroup;

  constructor(private googlePlus: GooglePlus,
    private fb: Facebook,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private autheficationService: AuthenticationService,
    private formBuilder: FormBuilder, 
    private loaderService: LoaderService,
    private popupService: PopupService) { 
    }

  ngOnInit() {
    this.loginGroup = this.formBuilder.group({
      email: [''],
      password: ['']
    });
    let returnUrl = this.route.queryParams['returnUrl'];
  }

  public googleLogin() {
    this.googlePlus.login({
      'scopes': 'profile',
      'offline': true,
      'webClientId': environment.googleClientKey
    })
      .then(res => { console.log(res); this.loginGoogleByApi(res.idToken); })
      .catch(err => console.error(err));
  }

  private async loginGoogleByApi(token: string) {
    let loader = await this.loaderService.showLoader()
    this.authService.signInByGoogle(token).subscribe(async (response) => {
      this.navigateDashboard(response.accessToken);
      this.showPopupNewSocialUser(response);
    }, async (error) => { await this.googlePlus.logout(); console.log(error); this.loaderService.dismissLoader(loader)}, () => this.loaderService.dismissLoader(loader) )
  }

  public facebookLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => { console.log('Logged into Facebook!', res); this.loginFacebookByApi(res.authResponse.accessToken) })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  private async loginFacebookByApi(token: string) {
    let loader = await this.loaderService.showLoader()
    this.authService.signInByFacebook(token).subscribe(async (response) => {
      this.navigateDashboard(response.accessToken);
      await this.fb.logout();
      this.showPopupNewSocialUser(response);
    }, async (error) => { await this.fb.logout();console.log(error); this.loaderService.dismissLoader(loader)}, () => this.loaderService.dismissLoader(loader) )
  }

  private showPopupNewSocialUser(response: TokenAuthModel){
    if(response.isNewUser){
      this.popupService.showPopup('A password has been sent to your email.');
    }
  }

  public navigateRegistration() {
    this.router.navigate(['/auth', 'registration'])
  }

  private navigateDashboard(accessApiToken: string) {
    this.autheficationService.logIn(accessApiToken);
  }

  public async login(){
    let loader = await this.loaderService.showLoader()
    let loginModel = new SignInAuthModel();
    loginModel.email = this.getControl('email').value;
    loginModel.password = this.getControl('password').value;

    this.authService.login(loginModel).subscribe((response) => {
      this.navigateDashboard(response.accessToken);
      this.clearInputs();
    }, () => this.loaderService.dismissLoader(loader), () => this.loaderService.dismissLoader(loader))
  }

  private clearInputs(){
    this.getControl('email').setValue('');
    this.getControl('password').setValue('')
  }

  public getControl(name: string){
    return this.loginGroup.get(name);
  }

}
