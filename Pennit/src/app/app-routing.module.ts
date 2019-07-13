import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntriesComponent } from './entries/entries.component';
import { LoginComponent } from './login/login.component';
import { WriteitComponent } from './writeit/writeit.component';
import { AccessGuard } from './access.guard';
import { StoriesComponent } from './stories/stories.component';
import { SecondloginGuard } from './secondlogin.guard';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home', component: EntriesComponent, pathMatch:'full'},
  {path:'login', component: LoginComponent, canActivate:[SecondloginGuard], pathMatch:'full'},
  {path:'writeit', component: WriteitComponent, canActivate:[AccessGuard], pathMatch:'full'},
  {path:'stories', component: StoriesComponent, canActivate:[AccessGuard], pathMatch:'full'},
  {path:'comments', component: CommentsComponent, canActivate:[AccessGuard], pathMatch:'full'},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
