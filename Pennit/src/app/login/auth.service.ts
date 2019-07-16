import { Injectable } from '@angular/core';
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedin:boolean;
  authfailed:boolean;
  loading:boolean;
  error_msg:string;
  user_info:User;
  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user_info = user;
        localStorage.setItem('loggedin_user', JSON.stringify(this.user_info));
        console.log(localStorage.getItem('loggedin_user'));
      } else {
        this.user_info = null;
        localStorage.setItem('loggedin_user', null);
        console.log(localStorage.getItem('loggedin_user'));
      }
    })
  }

  authenticate_login(email:string, password:string){
    this.loading = true;
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(response => {
      console.log(response);
      this.loggedin = true;
      this.authfailed = false;
      this.error_msg = null;
      setTimeout(
        () => {
          this.loading = false;
          this.router.navigate(['/writeit']);
        },600
      )
    })
    .catch(error => {
      this.error_msg = error.message;
      this.authfailed = true;
      this.loggedin = false;
      this.loading = false;
    })
  }

  logout(){
    this.afAuth.auth.signOut()
    .then(response => {
      console.log(response);
      console.log("logged out");
      this.authfailed = false;
      this.loggedin = false;
      this.loading = false;
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.log(error.message);
    });
  }
}