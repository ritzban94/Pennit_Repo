import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card'; 
import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuthModule } from "@angular/fire/auth";
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent, LogoutSnackbar } from './header/header.component';
import { HandleService } from './handle.service';
import { EntriesComponent } from './entries/entries.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { WriteitComponent } from './writeit/writeit.component';
import { AccessGuard } from './access.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptorOne } from './customInterceptor1.service';
import { CustomInterceptorTwo } from './customInterceptor2.service';
import { StoriesComponent } from './stories/stories.component';
import { environment } from 'src/environments/environment';
import { EditComponent } from './stories/edit/edit.component';
import { PhotosComponent } from './stories/photos/photos.component';
import { FilterPipe } from './filer.pipe';
import { CommentsComponent } from './comments/comments.component';
import { RandomavatarDirective } from './randomavatar.directive';
import { ProfileComponent } from './header/profile/profile.component';
import { MoodavatarDirective } from './moodavatar.directive';
import { SecondloginGuard } from './secondlogin.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EntriesComponent,
    FooterComponent,
    LoginComponent,
    WriteitComponent,
    StoriesComponent,
    EditComponent,
    PhotosComponent,
    FilterPipe,
    CommentsComponent,
    RandomavatarDirective,
    ProfileComponent,
    LogoutSnackbar,
    MoodavatarDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    HandleService,
    AccessGuard,
    SecondloginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptorOne,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptorTwo,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditComponent, PhotosComponent, ProfileComponent, LogoutSnackbar]
})
export class AppModule { }
