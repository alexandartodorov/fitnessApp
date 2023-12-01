import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './modals/stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.less',
})
export class CurrentTrainingComponent implements OnInit {
  public progress: number = 0;
  public timer: number;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  public ngOnInit(): void {
    this.startOrResumeTimer();
  }

  public startOrResumeTimer(): void {
    const step =
      (this.trainingService.getOngoingExercise().duration / 100) * 1000;
    this.timer = window.setInterval(() => {
      this.progress += 1;

      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
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
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
