import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';
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
  private availableExercisesSubscription: Subscription;
  private loadingStateSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  public ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);

    // this.loadingStateSubscription = this.uiService.loadingState$.subscribe((loading) => {
    //   this.isLoading = loading;
    // });

    this.initAvailableExercisesSubscription();
  }

  public initAvailableExercisesSubscription(): void {
    this.trainingService.initAvailableExercisesSubscription();
  }

  public onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
