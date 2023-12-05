import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { UIService } from '../../shared/UI.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.less'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public exercises: Exercise[];
  public isLoading = false;
  private availableExercisesSubscription: Subscription;
  private loadingStateSubscription: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UIService) {}

  public ngOnInit(): void {
    this.availableExercisesSubscription = this.trainingService.availableExercises$.subscribe({
      next: (exercises) => (this.exercises = exercises),
    });

    this.loadingStateSubscription = this.uiService.loadingState$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.initAvailableExercisesSubscription();
  }

  public initAvailableExercisesSubscription(): void {
    this.trainingService.initAvailableExercisesSubscription();
  }

  public ngOnDestroy(): void {
    if (this.availableExercisesSubscription) {
      this.availableExercisesSubscription.unsubscribe();
    }

    if (this.loadingStateSubscription) {
      this.loadingStateSubscription.unsubscribe();
    }
  }

  public onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
