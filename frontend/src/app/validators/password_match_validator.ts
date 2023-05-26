import { AbstractControl } from '@angular/forms';

export const passwordsMatchValidators = (
  passwordControlName: string,
  conformPasswordControlName: string
) => {
  const Validator = (form: AbstractControl) => {
    const passwordControl = form.get(passwordControlName);
    const conformPasswordControl = form.get(conformPasswordControlName);

    if (!passwordControl || !conformPasswordControl) return;
    if (passwordControl.value !== conformPasswordControl.value) {
      conformPasswordControl.setErrors({
        notMatch: true,
      });
    } else {
      const errors = conformPasswordControl.errors;
      if(!errors) return
      delete errors['notMatch'];
      conformPasswordControl.setErrors(errors)
    }
  };
  return Validator
};
