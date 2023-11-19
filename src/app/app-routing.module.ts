import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ProfileComponent } from './Pages/users/profile/profile.component';
import { UserListComponent } from './Pages/users/user-list/user-list.component';
import { SignupComponent } from './Pages/users/signup/signup.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full', title: 'Angular CRUD application'  }, // Default redirection to 'home'
  { path: 'signup', component: SignupComponent, title: 'Register'  },
  { path: 'profile/:id', component: ProfileComponent, title: 'Edit employee' },
  { path: 'user-list', component: UserListComponent , title: 'User List'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
