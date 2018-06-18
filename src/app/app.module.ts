import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../app/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, XHRBackend } from '@angular/http';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { UserboardModule }  from './userboard/userboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountModule }  from './account/account.module';
import { FormsModule }   from '@angular/forms';
import { ConfigService } from './shared/utils/config.service';
import { ColorPickerModule } from "ngx-color-picker";
import {RegistrationFormComponent} from './account/registration-form/registration-form.component'
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PostsComponent,
    UsersComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AccountModule,
    HttpModule,
    UserboardModule,
    ColorPickerModule
  ],
  exports:[ColorPickerModule],
  providers: [ConfigService, { 
    provide: XHRBackend, 
    useClass: AuthenticateXHRBackend
  },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
