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

  constructor(private trainingService: TrainingService, private loadingService: UIService) {}

  public ngOnInit(): void {
    this.availableExercisesSubscription = this.trainingService.availableExercises$.subscribe({
      next: (exercises) => (this.exercises = exercises),
    });

    this.trainingService.initAvailableExercisesSubscription();

    this.loadingStateSubscription = this.loadingService.loadingState$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  public ngOnDestroy(): void {
    this.availableExercisesSubscription.unsubscribe();
    this.loadingStateSubscription.unsubscribe();
  }

  public onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
