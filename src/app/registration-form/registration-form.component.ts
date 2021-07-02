import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  dynamicFormArray: any;

  constructor(
    private httpClient: HttpClient,
  ) { }

  registrationForm = new FormGroup({
  })

  ngOnInit(): void {
    this.httpClient.get('/assets/DynamicFormControl.json').subscribe(data => {
      this.dynamicFormArray = data
      this.createFormControl()
    })
  }
  createFormControl() {
    this.dynamicFormArray?.forEach((element: { Id: any; }) => {
      this.registrationForm.addControl(element.Id, new FormControl(''));
    });
    console.log(this.registrationForm);
  }

  sendForm() {
    console.log(this.registrationForm.value)
  }

  isSaveDisabled() {
    return this.registrationForm.invalid;
  }
}
