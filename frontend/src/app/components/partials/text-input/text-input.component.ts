import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
  @Input() control!:AbstractControl
  @Input() showErrorWhen = true
  @Input() label!:string
  @Input() type : 'email' | 'password' | 'text' = 'text'
  get formControl(){
    return this.control as FormControl
  }

}
