import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { MainContentComponent } from './main-content/main-content.component';
import { WfmFormComponent } from './wfm-form/wfm-form.component';
import { ProfileComponent } from './profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';


const isIframe = window !== window.parent && !window.opener;

const routes: Routes = [
  {path: 'wfmForm', component: WfmFormComponent,  canActivate: [MsalGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [MsalGuard]},
  // Add other routes here
  {path:'', component: ProfileComponent, canActivate:[MsalGuard]},
  {path:'**', component: ProfileComponent, canActivate:[MsalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
