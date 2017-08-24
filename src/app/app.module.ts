import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router }           from '@angular/router';

import { AppRoutingModule } from './app.routing.module';

import { ApiModule }    from './api/module';
import { AppComponent } from './app.component';
import { VideoList, VideoShow }    from './video/index';
import { UserLogin, UserLogout }    from './user/index';

import { AuthGuard } from './guards/index';

import { CurrentUser } from './services/index';

import { PageNotFoundComponent }  from './shared/index';

@NgModule({
  declarations: [
    AppComponent,
    VideoList,
    VideoShow,
    UserLogin,
    UserLogout,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,

    AppRoutingModule,

    ApiModule
  ],
  providers: [
    AuthGuard,
    CurrentUser
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
