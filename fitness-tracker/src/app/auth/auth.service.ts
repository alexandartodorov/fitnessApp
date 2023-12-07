import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private angularFireAuth: Auth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  public registerUser(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());
    createUserWithEmailAndPassword(this.angularFireAuth, authData.email, authData.password)
      .then((res) => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  public login(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());
    signInWithEmailAndPassword(this.angularFireAuth, authData.email, authData.password)
      .then((res) => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  public logout() {
    signOut(this.angularFireAuth);
  }

  public initAuthSubscription(): void {
    onAuthStateChanged(this.angularFireAuth, (currentUser) => {
      if (currentUser) {
        this.store.dispatch(new AuthActions.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new AuthActions.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }
}
