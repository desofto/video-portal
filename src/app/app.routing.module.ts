import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { VideoList, VideoShow }   from './video/index';
import { UserLogin, UserLogout }  from './user/index';

import { AuthGuard }              from './guards/index';

import { PageNotFoundComponent }  from './shared/index';

const appRoutes: Routes = [
  { path: '',           component: VideoList, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'video/:id',  component: VideoShow, canActivate: [AuthGuard] },
  { path: 'login',      component: UserLogin },
  { path: 'logout',     component: UserLogout },
  { path: '**',         component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class AppRoutingModule { }
