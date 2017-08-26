import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { VideoList, VideoShow }   from './video';
import { UserLogin, UserLogout }  from './user';

import { AuthGuard }              from './guards';

import { PageNotFoundComponent }  from './shared';

const appRoutes: Routes = [
  // root path
  { path: '',           component: VideoList, pathMatch: 'full', canActivate: [AuthGuard] },
  // path to login form
  { path: 'login',      component: UserLogin },
  // path for logout
  { path: 'logout',     component: UserLogout },
  // path to show videos. it must be declared after login/logout form to not catch them
  { path: ':id',        component: VideoShow, canActivate: [AuthGuard] },
  // all other paths, like '/unknown/unknown'
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

// export our routing components to easy import in app.module
export const routedComponents = [
  VideoList, VideoShow,
  UserLogin, UserLogout,
  PageNotFoundComponent
];
