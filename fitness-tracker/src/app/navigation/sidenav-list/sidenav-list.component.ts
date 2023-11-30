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
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.less',
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();

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

  public onLogout(): void {
    this.onClose();
    this.authService.logout();
  }

  public onClose(): void {
    this.closeSidenav.emit();
  }
}
