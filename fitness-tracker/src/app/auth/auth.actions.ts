import { Action } from '@ngrx/store';

export const SET_AUTHENTICTED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICTED = '[Auth] Set Unauthenticated';

export class SetAuthenticated implements Action {
  public readonly type = SET_AUTHENTICTED;
}

export class SetUnauthenticated implements Action {
  public readonly type = SET_UNAUTHENTICTED;
}
