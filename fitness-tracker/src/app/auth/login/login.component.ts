import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/UI.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLoading = false;

  private loadingSubscription: Subscription;

  constructor(private authService: AuthService, private loadingService: UIService) {}

  public ngOnInit(): void {
    this.initLoginForm();
    this.loadingSubscription = this.loadingService.loadingState$.subscribe((isLoading) => (this.isLoading = isLoading));
  }

  public ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  public onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }

  private initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }
}
