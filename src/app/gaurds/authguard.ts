import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class Authguard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLogged = !!localStorage.getItem('my_login_token');
    if (isLogged) {
      return true;
    } else {
      this.router.navigate(['login'], {queryParams:
              {
                nextTo: state.url
              }
      });
      return false;
    }
  }

}
