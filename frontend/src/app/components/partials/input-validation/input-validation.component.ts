import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATOR_MESSAGES:any={
  required:'Should not be empty',
  email:'Email is not valid',
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent implements OnChanges ,OnInit{
  @Input() control!:AbstractControl
  @Input() showErrorsWhen=true
  errorMessages:string[] = []
  ngOnChanges(changes: SimpleChanges): void {
 this.checkValidation()
  }
  ngOnInit(): void {
this.control.statusChanges.subscribe(()=> this.checkValidation())
this.control.valueChanges.subscribe(()=> this.checkValidation())
  }
  checkValidation(){
    const errors =this.control.errors
    if(!errors){
      this.errorMessages=[]
      return
    }
    const errorKey =Object.keys(errors)
    this.errorMessages = errorKey.map(key => VALIDATOR_MESSAGES[key])
  }

}
