import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ModalComponent} from "./modal/modal.component";
import {MomentPipe} from "./shared/moemnt.pipe";
import {MainComponent} from "./main/main.component";
import {SelectorComponent} from "./selector/selector.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {AuthComponent} from "./auth/auth.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    AuthComponent,
    CalendarComponent,
    SelectorComponent,
    MainComponent,
    MomentPipe,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
