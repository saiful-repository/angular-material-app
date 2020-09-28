import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistratiionComponent } from './registratiion/registratiion.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListRegistrationComponent } from './list-registration/list-registration.component';
@NgModule({
  declarations: [RegistratiionComponent, ListRegistrationComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ]
})
export class StudentModule { }
