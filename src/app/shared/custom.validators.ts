import { AbstractControl } from '@angular/forms';

export class CustomValidators{

    public static ConfirmPassword(control:AbstractControl) {
        let confirmPasswordInput = control.get('confirmPassword');

        let password = control.get('password').value;
        let confirmPassword = confirmPasswordInput.value;

        if(password != confirmPassword){
            confirmPasswordInput.setErrors({ ConfirmPasswordError: true })
        }
        return null;
    }

}