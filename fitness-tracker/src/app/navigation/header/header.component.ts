import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  public isAuth$: Observable<boolean>;
  public authSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) {}

  public ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
