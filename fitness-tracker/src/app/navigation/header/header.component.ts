import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();

  public isAuth: boolean;
  public authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  public ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
