import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Constants } from 'src/app/shared/common/constants';
import { CustomValidators } from 'src/app/shared/custom.validators';
import { SignUpAuthModel } from 'src/app/shared/models/auth/signUp.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { PopupService } from 'src/app/services/popup.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public registrationGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private popupService: PopupService,
    public location: Location) { }

  ngOnInit() {
    this.registrationGroup = this.formBuilder.group({
      firstName: ['', { validators: [Validators.required]}],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', 
        [Validators.pattern(Constants.passwordPattern), Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: CustomValidators.ConfirmPassword });
    this.getControl('password').valueChanges.subscribe(() => {
      this.getControl('confirmPassword').updateValueAndValidity();
    });
  }

  public getControl(name: string) {
    return this.registrationGroup.controls[name];
  }

  public async signUp() {
    let model = new SignUpAuthModel;
    model.firstName = this.getControl('firstName').value;
    model.lastName = this.getControl('lastName').value;
    model.email = this.getControl('email').value;
    model.password = this.getControl('password').value;
    let loader = await this.loaderService.showLoader();

    this.authService.registration(model).subscribe(async (message) => {
      let alert = await this.popupService.showPopup(message, 'Info');
      await this.loaderService.dismissLoader(loader);
      this.router.navigate(['/auth']);
    }, () => this.loaderService.dismissLoader(loader), () => this.loaderService.dismissLoader(loader));
  }


}
