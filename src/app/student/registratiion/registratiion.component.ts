import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormGroup} from '@angular/forms'
import { Registration } from '../registration';
import { HttpEvent, HttpEventType } from '@angular/common/http';
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
  imageFile: File;
  portfolioImage: Array<File>;
  progress: number = 0;

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
      this.registration.photo = this.imageFile;
      this.registration.portfolioImage = this.portfolioImage;

      console.log(JSON.stringify(this.registration));

      

      //this.stdService.addRegistration(this.registration).subscribe(
      //  res => {         
      //    console.log(res);
      //  },
      //  error => {
      //    console.log(error);
      //    if (error.error instanceof Error) {            
      //      console.error('An error occurred:', error.error.message);
      //    } else {            
      //      console.error(`Api returned code ${error.status}`);
      //    }
      //  }
      //);

      this.stdService.addRegistration(this.registration).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully registered!', event.body);
            setTimeout(() => {
              this.progress = 0;
            }, 1500);

        }
      })


      //this.ShowHide = false;
    }
  }

  onFileChanged(event) {
    this.imageFile = event.target.files[0];
    
  }

  onFileChangedMultiple(event) {
    this.portfolioImage = event.target.files;

  }

}

//export class MyErrorStateMatcher implements ErrorStateMatcher {
//  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//    const isSubmitted = form && form.submitted;
//    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//  }
//}
