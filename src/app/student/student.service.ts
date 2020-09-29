import { Injectable } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl } from '@angular/forms'
import { Registration } from './registration';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  registrationForm: FormGroup
  //formData: FormData = new FormData();

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
    console.log(reg.photo);
    let formData = new FormData();
    formData.append("firstName", reg.firstName.toString());
    formData.append("lastName", reg.lastName.toString());
    formData.append("email", reg.email.toString());
    formData.append("phone", reg.phone.toString());
    formData.append("password", reg.password.toString());
    formData.append("photo", reg.photo);
    console.log(JSON.stringify(formData));
    formData.forEach((value, key) => {
      console.log(key + ">>" + value)
    });
    //let headers = new HttpHeaders({
    //  'Content-Type': 'application/x-www-form-urlencoded'
    //});
    return this.http.post('https://localhost:44304/api/Student/AddStudent', formData, { responseType: 'json' });
  }

  listRegistration() {   
    return this.http.get('https://localhost:44304/api/student/');
  }

  

}
