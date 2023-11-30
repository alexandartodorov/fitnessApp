import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private router: Router) {}

  private user: User;

  public authChange = new Subject<boolean>();

  public registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.onAuthSuccess();
  }

  public login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.onAuthSuccess();
  }

  public logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  public getUser() {
    return { ...this.user };
  }

  public isAuth() {
    return this.user != null;
  }

  private onAuthSuccess(): void {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
