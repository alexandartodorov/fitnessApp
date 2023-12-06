import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { environment } from '../environments/environment';
import { UIService } from './shared/UI.service';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, HeaderComponent, SidenavListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AuthModule,
    TrainingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
