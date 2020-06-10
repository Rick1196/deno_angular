import { FormGroup } from "@angular/forms";

// custom validator para verficar la igualdad de password y confirmationPassword
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return si otro validator ya ha regresado un error
      return;
    }

    // si las 2 password no coinciden regresa un error
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
