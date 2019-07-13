import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HandleService } from './handle.service';

@Injectable()
export class AccessGuard implements CanActivate{
  constructor(private servInsG: HandleService, private router:Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.servInsG.loggedin == true && this.servInsG.authfailed == false)
      return true;
    else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
