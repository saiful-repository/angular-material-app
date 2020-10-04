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

  validationMessages = {
    'firstName': {
      'required': 'first name is required',
      'minlength': 'first name should be min 10 character',
      'maxlength': 'first name should be max 20 character'
    },
    'lastName': {
      'required': 'last name is required'
    },
    'email': {
      'required': 'email is required',
      'email': 'email is invalid'
    },
    'phone': {
      'required': 'phone is required'
    },
     'password': {
       'required': 'password is required'    
    },
    'confirmPasword': {
      'required': 'confirm Pasword is required',
      'noMatch': 'confirm Pasword not match'
    }
  }

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'phone':'',
    'password': '',
    'confirmPasword': ''
  }

  constructor(private stdService: StudentService) { }


  ngOnInit(): void {
    this.registrationForm = this.stdService.generateFormGroup()   

    this.registrationForm.get("email").valueChanges.subscribe(data => {
      console.log(data);
    })
    //this.matcher = new MyErrorStateMatcher();
    this.registrationForm.valueChanges.subscribe(data => {
      this.logValidationErrors(this.registrationForm);     
    })
    
  }

  SubmitRegistration() {
    this.registrationForm.markAllAsTouched();
    this.logValidationErrors(this.registrationForm);    

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

  logValidationErrors(formGroup: FormGroup = this.registrationForm) {
    Object.keys(formGroup.controls).forEach((key:string) => {
      const abstactControl = formGroup.get(key);
      if (abstactControl instanceof FormGroup) {
        this.logValidationErrors(abstactControl);
      }
      else {
        this.formErrors[key] = '';        
        if (abstactControl && !abstactControl.valid && (abstactControl.touched || abstactControl.dirty)) {
          const message = this.validationMessages[key];         
          for (const errorKey in abstactControl.errors) {
            if (errorKey) {
              this.formErrors[key] += message[errorKey] + ' ';
            }
          }
          
        }
        //console.log('key=' + key + ' Value=' + abstactControl.value);
      }
    })
  }

  

}

//export class MyErrorStateMatcher implements ErrorStateMatcher {
//  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//    const isSubmitted = form && form.submitted;
//    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//  }
//}


