import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/UI.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
})
export class SignupComponent implements OnInit, OnDestroy {
  public maxDate: Date;
  public isLoading = false;

  private loadingSubscription: Subscription;

  constructor(private authService: AuthService, private loadingService: UIService) {}

  public ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSubscription = this.loadingService.loadingState$.subscribe((loading) => (this.isLoading = loading));
  }

  public ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  public onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
