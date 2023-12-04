import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.less'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public exercises: Exercise[];
  private availableExercisesSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  public ngOnInit(): void {
    this.availableExercisesSubscription = this.trainingService.getAvailableExercises().subscribe({
      next: (exercises) => (this.exercises = exercises),
    });
  }

  public ngOnDestroy(): void {
    this.availableExercisesSubscription.unsubscribe();
  }

  public onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
