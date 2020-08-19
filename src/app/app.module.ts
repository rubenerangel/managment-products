import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Form */
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './admin/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { SectionPageComponent } from './common/section-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddProductsComponent } from './admin/dialogs/add-products/add-products.component';
import { ConfirmDeleteComponent } from './admin/dialogs/confirm-delete/confirm-delete.component';
 
/* MaterialModule */
import { MaterialModule } from './material.module';
/* Reactive Forms */
import {ReactiveFormsModule} from '@angular/forms';
/* FireBase Service  */
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { CdkColumnDef } from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    ContactComponent,
    AboutComponent,
    SectionPageComponent,
    DashboardComponent,
    AddProductsComponent,
    ConfirmDeleteComponent,
  ],
  entryComponents: [
    AddProductsComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.configFirebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [AngularFirestore, CdkColumnDef],
  bootstrap: [AppComponent]
})
export class AppModule { }
