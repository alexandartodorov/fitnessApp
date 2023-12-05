import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.less'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  public ongoingTraining: boolean = false;

  private ongoingExerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  public ngOnInit(): void {
    this.ongoingExerciseSubscription = this.trainingService.exerciseChanged$.subscribe((ongoingExercise) => {
      if (ongoingExercise) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    });
  }

  public ngOnDestroy(): void {
    this.ongoingExerciseSubscription.unsubscribe();
  }
}
