import { BehaviorSubject, Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
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
import { UIService } from '../shared/UI.service';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private angularFireAuth: Auth,
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  private isAuthenticated = false;

  public authChange = new Subject<boolean>();

  public registerUser(authData: AuthData): void {
    this.uiService.loadingState$.next(true);
    createUserWithEmailAndPassword(this.angularFireAuth, authData.email, authData.password)
      .then((res) => {
        this.uiService.loadingState$.next(false);
      })
      .catch((error) => {
        this.uiService.loadingState$.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  public login(authData: AuthData): void {
    this.uiService.loadingState$.next(true);
    signInWithEmailAndPassword(this.angularFireAuth, authData.email, authData.password)
      .then((res) => {
        this.uiService.loadingState$.next(false);
      })
      .catch((error) => {
        this.uiService.loadingState$.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  public logout() {
    signOut(this.angularFireAuth);
    this.trainingService.cancelSubscriptions();
    this.authChange.next(false);
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  public initAuthSubscription(): void {
    onAuthStateChanged(this.angularFireAuth, (currentUser) => {
      if (currentUser) {
        this.authChange.next(true);
        this.isAuthenticated = true;
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      }
    });
  }

  public isAuth() {
    return this.isAuthenticated;
  }
}
