import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailPattern, nombreApellidoPatern, noPuedeSertrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})

export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorSerice.nombreApellidoPatern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorSerice.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorSerice.noPuedeSertrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  },
    {
      validators: [this.validatorSerice.camposIguales('password', 'password2')]
    }
  );

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if (errors?.['required']) {
      return 'El email es obligatorio'
    } else if (errors?.['pattern']) {
      return 'el valor no tiene un formato de email valido'
    } else if (errors?.['emailTomado']) {
      return 'Ya existe un user con este email'
    }

    return '';
  }

  constructor(private fb: FormBuilder,
    private validatorSerice: ValidatorService,
    private emailValidator: EmailValidatorService
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'nombre uno',
      email: 'test1@test.com',
      username: 'nosd username'
    });
  }

  campoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {
    this.miFormulario.markAllAsTouched();
  }

}