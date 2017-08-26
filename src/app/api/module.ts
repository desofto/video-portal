import { NgModule }     from '@angular/core';
import { HttpModule }   from '@angular/http';

import { UserApi, VideoApi }   from './';

@NgModule({
  imports: [
    HttpModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    UserApi,
    VideoApi
  ]
})

export class ApiModule {}
