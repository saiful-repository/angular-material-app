import { Injectable } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl } from '@angular/forms'
import { Registration } from './registration';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  registrationForm:FormGroup

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  generateFormGroup(): FormGroup {    

    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        password: ['', Validators.required],
        confirmPasword: ['', Validators.required]         
      }, { validator: this.passwordMatchValidator })

    return this.registrationForm
  }

  passwordMatchValidator(frm: FormGroup) {
    if (frm.get('password').value !== frm.get('confirmPasword').value) {
      frm.get('confirmPasword').setErrors({ 'noMatch': true });
      return { invalid: true };
    }    
  }

  addRegistration(reg: Registration) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('https://localhost:44304/api/student/', JSON.stringify(reg), { headers, responseType: 'json' });
  }

  listRegistration() {   
    return this.http.get('https://localhost:44304/api/student/');
  }

}
