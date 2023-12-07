import { Action } from '@ngrx/store';

import { SET_AUTHENTICTED, SET_UNAUTHENTICTED, AuthActions } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false,
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICTED:
      return {
        isAuthenticated: true,
      };
    case SET_UNAUTHENTICTED:
      return {
        isAuthenticated: false,
      };
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
