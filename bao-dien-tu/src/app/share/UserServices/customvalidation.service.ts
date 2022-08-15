import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  constructor() { }
  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
       
        return null!;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[!@#$%^&*])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      
      return valid ? null! : { invalidPassword: true };
    };
  }
  patternValidatorUN(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null!;
      }
      const regex = new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,}$');
      const valid = regex.test(control.value);
      
      return valid ? null! : { invalidUsername: true };
    };
  }
  MatchPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
