import { Observable, Subject, Subscription, map, tap } from 'rxjs';
import { Exercise } from './exercise.model';
import { Firestore, collection, collectionData, addDoc, doc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { UIService } from '../shared/UI.service';

@Injectable()
export class TrainingService {
  public exerciseChanged$ = new Subject<Exercise>();
  public completedOrCancelledExercises$ = new Subject<Exercise[]>();
  public availableExercises$ = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private fireBaseSubscriptions: Subscription[] = [];
  private ongoingExercise: Exercise;

  constructor(private fireStore: Firestore, private uiService: UIService) {}

  public startExercise(selectedId: string) {
    this.ongoingExercise = this.availableExercises.find((ex) => ex.id === selectedId);
    this.exerciseChanged$.next({ ...this.ongoingExercise });
  }

  public completeExercise(): void {
    this.addPastExerciseToFireStore({
      ...this.ongoingExercise,
      date: new Date(),
      state: 'completed',
    });

    this.ongoingExercise = null;
    this.exerciseChanged$.next(null);
  }

  public cancelExercise(progress: number): void {
    this.addPastExerciseToFireStore({
      ...this.ongoingExercise,
      duration: this.ongoingExercise.duration * (progress / 100),
      calories: this.ongoingExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });

    this.ongoingExercise = null;
    this.exerciseChanged$.next(null);
  }

  public initAvailableExercisesSubscription(): void {
    this.uiService.loadingState$.next(true);
    const availableExercises$ = collectionData(collection(this.fireStore, 'availableExercises'), {
      idField: 'id',
    }) as Observable<Exercise[]>;

    this.fireBaseSubscriptions.push(
      availableExercises$.subscribe({
        next: (exercises) => {
          this.uiService.loadingState$.next(false);
          this.availableExercises = exercises;
          this.availableExercises$.next(exercises);
        },
        error: (error) => {
          this.uiService.loadingState$.next(false);
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
          this.completedOrCancelledExercises$.next(exercises);
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
