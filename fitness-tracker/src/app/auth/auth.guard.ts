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

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  if (inject(AuthService).isAuth()) {
    return true;
  } else {
    return inject(Router).navigate(['/login']);
  }
};
