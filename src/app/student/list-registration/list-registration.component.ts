import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-list-registration',
  templateUrl: './list-registration.component.html',
  styleUrls: ['./list-registration.component.scss']
})
export class ListRegistrationComponent implements OnInit {

  ShowHide: boolean = false;
  listRegistration: Object;
 
  constructor(private stdService: StudentService) { }

  ngOnInit(): void {
    this.loadRegistrationList();    
  }

  loadRegistrationList() {
    this.stdService.listRegistration().subscribe(
      res => {
        console.log(res);
        this.listRegistration = res;        
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

