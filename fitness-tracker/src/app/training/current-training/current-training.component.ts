import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './modals/stop-training.component';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.less'],
})
export class CurrentTrainingComponent implements OnInit {
  public progress: number = 0;
  public timer: number;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  public ngOnInit(): void {
    this.startOrResumeTimer();
  }

  public startOrResumeTimer(): void {
    this.store
      .select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe({
        next: (ex) => {
          const step = (ex.duration / 100) * 1000;
          this.timer = window.setInterval(() => {
            this.progress += 1;

            if (this.progress >= 100) {
              this.trainingService.completeExercise();
              clearInterval(this.timer);
            }
          }, step);
        },
      });
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
