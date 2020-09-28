import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistratiionComponent } from './student/registratiion/registratiion.component';
import { ListRegistrationComponent } from './student/list-registration/list-registration.component';

const routes: Routes = [
  { path: '', component: RegistratiionComponent },
  { path: 'all-registration', component: ListRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
