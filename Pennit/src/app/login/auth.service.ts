import { Injectable } from '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signedup:boolean;
  loggedin:boolean;
  authfailed:boolean;
  loading:boolean;
  error_msg:string;
  user_info:User;
  access_token:string;
  constructor(public afAuth: AngularFireAuth, public router: Router) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user_info = user;
        localStorage.setItem('loggedin_user', JSON.stringify(this.user_info));
        console.log(localStorage.getItem('loggedin_user'));
        this.access_token = JSON.parse(localStorage.getItem('loggedin_user')).stsTokenManager.accessToken;
        console.log(this.access_token)
      } else {
        this.user_info = null;
        localStorage.setItem('loggedin_user', null);
        console.log(localStorage.getItem('loggedin_user'));
        this.access_token = null;
      }
    })
  }

  signup(email:string, password:string){
    this.loading = true;
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(response => {
        console.log(response);
        this.signedup = true;
        this.error_msg = null;
        setTimeout(() => {
          this.loading = false;
          this.autologin();
          this.signedup = false;
          this.router.navigate(['/writeit']);
        },700);
      }
    )
    .catch(error => {
      console.log(error);
      this.loading = false;
      this.signedup = false;
      this.error_msg = error.message;
    });
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

  autologin(): void|boolean {
    const loggedin_user = JSON.parse(localStorage.getItem('loggedin_user'));
    if(!loggedin_user)
      return true;
    else{
      console.log(new Date().getTime());
      if(new Date().getTime() < loggedin_user.stsTokenManager.expirationTime){
        this.loggedin = true;
        this.authfailed = false;
        this.error_msg = null;
        return false;
      }else
        return true;
    }
  }
}