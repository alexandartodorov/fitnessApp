import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './modals/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.less',
})
export class CurrentTrainingComponent implements OnInit {
  @Output() exitTraining = new EventEmitter<void>();

  public progress: number = 0;
  public timer: number;

  constructor(private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.startOrResumeTimer();
  }

  public startOrResumeTimer(): void {
    this.timer = window.setInterval(() => {
      this.progress += 5;

      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  public onTimerStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.exitTraining.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
