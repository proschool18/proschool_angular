import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { AlertComponent } from './_alert/alert/alert.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { RegistrationComponent } from './registration/registration.component';
import { EventlistsComponent } from './_alert/events/events.component';
import { VirtualboardComponent } from './virtualboard/virtualboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    AccessDeniedComponent,
    RegistrationComponent,
    EventlistsComponent,
    VirtualboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  exports: [
  ],
  entryComponents: [AlertComponent, EventlistsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
