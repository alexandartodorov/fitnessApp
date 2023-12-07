import { Observable, Subject, Subscription, map, tap } from 'rxjs';
import { Exercise } from './exercise.model';
import { Firestore, collection, collectionData, addDoc, doc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import { Store } from '@ngrx/store';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
  public exerciseChanged$ = new Subject<Exercise>();
  public completedOrCancelledExercises$ = new Subject<Exercise[]>();
  public availableExercises$ = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private fireBaseSubscriptions: Subscription[] = [];
  private ongoingExercise: Exercise;

  constructor(private fireStore: Firestore, private uiService: UIService, private store: Store<fromTraining.State>) {}

  public startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartExercise(selectedId));
  }

  public completeExercise(): void {
    this.addPastExerciseToFireStore({
      ...this.ongoingExercise,
      date: new Date(),
      state: 'completed',
    });

    this.store.dispatch(new Training.StopExercise());
  }

  public cancelExercise(progress: number): void {
    this.addPastExerciseToFireStore({
      ...this.ongoingExercise,
      duration: this.ongoingExercise.duration * (progress / 100),
      calories: this.ongoingExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });

    this.store.dispatch(new Training.StopExercise());
  }

  public initAvailableExercisesSubscription(): void {
    // this.uiService.loadingState$.next(true);
    this.store.dispatch(new UI.StartLoading());
    const availableExercises$ = collectionData(collection(this.fireStore, 'availableExercises'), {
      idField: 'id',
    }) as Observable<Exercise[]>;

    this.fireBaseSubscriptions.push(
      availableExercises$.subscribe({
        next: (exercises) => {
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Training.SetAvailableExercises(exercises));
        },
        error: (error) => {
          this.store.dispatch(new UI.StopLoading());
          this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
          this.availableExercises$.next(null);
        },
      })
    );
  }

  public getOngoingExercise(): Exercise {
    return { ...this.ongoingExercise };
  }

  public initCompletedOrCancelledExercisesSubscription(): void {
    const pastExercises$ = collectionData(collection(this.fireStore, 'pastExercises'), {
      idField: 'id',
    }) as Observable<Exercise[]>;

    this.fireBaseSubscriptions.push(
      pastExercises$.subscribe({
        next: (exercises) => {
          this.store.dispatch(new Training.SetFinishedExercises(exercises));
        },
      })
    );
  }

  public cancelSubscriptions(): void {
    this.fireBaseSubscriptions.forEach((sub) => sub.unsubscribe());
  }

  private addPastExerciseToFireStore(pastExercise: Exercise) {
    addDoc(collection(this.fireStore, 'pastExercises'), pastExercise);
  }
}
