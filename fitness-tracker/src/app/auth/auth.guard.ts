import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
  UrlTree,
} from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (this.authService.isAuth()) {
//       return true;
//     } else {
//       return this.router.navigate(['/login']);
//     }
//   }
// }

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  if (inject(AuthService).isAuth()) {
    return true;
  } else {
    return inject(Router).navigate(['/login']);
  }
};
