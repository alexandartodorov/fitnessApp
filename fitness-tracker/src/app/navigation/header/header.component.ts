import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
