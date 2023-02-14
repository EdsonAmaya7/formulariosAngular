import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { CustomMinDirective } from '../../template/directives/custom-min.directive';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.reset({ ...this.persona, condiciones: true });

    // subscribirse a los cambios del formulario
    // this.miFormulario.valueChanges.subscribe(form =>{
    //   console.log(form)
    // })
    // subscribirse a los cambios del formulario de un campo
    this.miFormulario.get('condiciones')?.valueChanges.subscribe(newValue => {
      // console.log('newValue', newValue)
    })

    // subscribirse a los cambios del formulario
    // extrae condiciones como una variable independiente
    // y guarda el rest
    this.miFormulario.valueChanges.subscribe(({ condiciones, ...rest }) => {
      this.persona = rest
    })
  }

  // sincronizar el objeto formulario con el de la persona al precionar guardar
  guardar() {
    const formValue = { ...this.miFormulario.value };
    delete formValue.condiciones
    this.persona = formValue
    console.log(formValue)
  }

}
