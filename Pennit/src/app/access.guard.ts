import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';

@Injectable()
export class AccessGuard implements CanActivate{
  constructor(private authservInsG: AuthService, private router:Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authservInsG.loggedin == true && this.authservInsG.authfailed == false)
      return true;
    else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
