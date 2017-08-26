import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { AppRoutingModule, routedComponents } from './app.routing.module';

import { ApiModule } from './api/module';
import { AppComponent } from './app.component';
import { VideoItem, VideoSidebar } from './video';

import { AuthGuard } from './guards';

import { CurrentUser, VideoStorage } from './services';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    VideoItem, VideoSidebar
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
    CurrentUser, VideoStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
