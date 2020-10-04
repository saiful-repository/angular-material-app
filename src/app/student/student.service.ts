import { Injectable } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl } from '@angular/forms'
import { Registration } from './registration';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


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
        firstName: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
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

  addRegistration(reg: Registration): Observable<any> {
    console.log(reg.photo);
    let formData = new FormData();
    formData.append("firstName", reg.firstName.toString());
    formData.append("lastName", reg.lastName.toString());
    formData.append("email", reg.email.toString());
    formData.append("phone", reg.phone.toString());
    formData.append("password", reg.password.toString());
    formData.append("photo", reg.photo);
    for (var i = 0; i < reg.portfolioImage.length; i++) {
      formData.append("portfolioImage", reg.portfolioImage[i]);
    }
    
    console.log(JSON.stringify(formData));
    formData.forEach((value, key) => {
      console.log(key + ">>" + value)
    });
    //let headers = new HttpHeaders({
    //  'Content-Type': 'application/x-www-form-urlencoded'
    //});
    return this.http.post('https://localhost:44304/api/Student/AddStudent', formData,
      {
        reportProgress: true,
        observe: 'events',
        responseType: 'json'
      }
    ).pipe(
      catchError(this.errorMgmt)
    );
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  listRegistration() {   
    return this.http.get('https://localhost:44304/api/student/');
  }

  

}
