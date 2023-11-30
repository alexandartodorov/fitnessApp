import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.less',
})
export class SidenavListComponent {
  @Output() closeSidenav = new EventEmitter<void>();

  public onClose() {
    this.closeSidenav.emit();
  }
}
