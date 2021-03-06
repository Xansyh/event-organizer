import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'
import { MatStepperModule } from '@angular/material/stepper';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { EventBoardComponent } from './event-board/event-board.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { SimpleEventCardComponent } from './simple-event-card/simple-event-card.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    FooterComponent,
    SideNavComponent,
    TopNavComponent,
    EventBoardComponent,
    CreateEventComponent,
    SimpleEventCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
