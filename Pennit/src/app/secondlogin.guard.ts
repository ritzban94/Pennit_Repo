import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HandleService } from './handle.service';

@Injectable()
export class SecondloginGuard implements CanActivate{
  
  constructor(private servInsSG:HandleService, private router:Router){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.servInsSG.loggedin == false){
      console.log("SLG true");
      return true;
    }
    else{
      console.log("SLG false");
      this.router.navigate(['/']);
      return false;
    }
  } 
}
