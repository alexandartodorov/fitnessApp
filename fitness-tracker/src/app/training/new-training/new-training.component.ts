import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.less'],
})
export class NewTrainingComponent implements OnInit {
  public exercises$: Observable<Exercise[]>;
  public isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) {}

  public ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);

    this.initAvailableExercisesSubscription();
  }

  public initAvailableExercisesSubscription(): void {
    this.trainingService.initAvailableExercisesSubscription();
  }

  public onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
