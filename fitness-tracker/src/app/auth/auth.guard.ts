import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, UrlTree } from '@angular/router';

import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  return inject(Store).select(fromRoot.getIsAuth).pipe(take(1));
};
