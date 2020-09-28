import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormGroup} from '@angular/forms'
import { Registration } from '../registration';
//import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-registratiion',
  templateUrl: './registratiion.component.html',
  styleUrls: ['./registratiion.component.scss']
})
export class RegistratiionComponent implements OnInit{

  registrationForm: FormGroup
  matcher: any
  registration: Registration
  msg: any
  ShowHide: boolean = false;

  constructor(private stdService: StudentService) { }


  ngOnInit(): void {
    this.registrationForm = this.stdService.generateFormGroup()   

    //this.matcher = new MyErrorStateMatcher();
  }

  SubmitRegistration() {
    if (this.registrationForm.valid) {
     
      this.ShowHide = true;

      this.registration = new Registration()
      this.registration.firstName = this.registrationForm.get('firstName').value;
      this.registration.lastName = this.registrationForm.get('lastName').value;
      this.registration.email = this.registrationForm.get('email').value;
      this.registration.phone = this.registrationForm.get('phone').value.toString();
      this.registration.password = this.registrationForm.get('password').value;

      console.log(JSON.stringify(this.registration));

      

      this.stdService.addRegistration(this.registration).subscribe(
        res => {         
          console.log(res);
        },
        error => {
          console.log(error);
          if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            //console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
            console.error(`Api returned code ${error.status}`);
          }
        }
      );

      this.ShowHide = false;
    }
  }

}

//export class MyErrorStateMatcher implements ErrorStateMatcher {
//  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//    const isSubmitted = form && form.submitted;
//    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//  }
//}
