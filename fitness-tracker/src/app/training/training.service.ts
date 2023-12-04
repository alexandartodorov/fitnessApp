import { Observable, Subject, tap } from 'rxjs';
import { Exercise } from './exercise.model';
import { Firestore, collection, collectionData, addDoc, doc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService {
  public exerciseChanged = new Subject<Exercise>();

  // private availableExercises: Exercise[] = [
  //   { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  //   { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
  //   { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
  //   { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  // ];

  constructor(private fireStore: Firestore) {}

  private availableExercises: Exercise[] = [];

  private ongoingExercise: Exercise;
  private exercises: Exercise[] = [];

  public startExercise(selectedId: string) {
    this.ongoingExercise = this.availableExercises.find((ex) => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.ongoingExercise });
  }

  public completeExercise(): void {
    this.addPastExerciseToFireStore({
      ...this.ongoingExercise,
      date: new Date(),
      state: 'completed',
    });

    this.ongoingExercise = null;
    this.exerciseChanged.next(null);
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
    this.exerciseChanged.next(null);
  }

  public getAvailableExercises(): Observable<Exercise[]> {
    const availableExercises$ = collectionData(collection(this.fireStore, 'availableExercises'), {
      idField: 'id',
    }) as Observable<Exercise[]>;

    return availableExercises$.pipe(
      tap((exercises) => {
        this.availableExercises = exercises;
      })
    );
  }

  public getOngoingExercise(): Exercise {
    return { ...this.ongoingExercise };
  }

  public getCompletedOrCancelledExercises() {
    const pastExercises$ = collectionData(collection(this.fireStore, 'pastExercises'), {
      idField: 'id',
    }) as Observable<Exercise[]>;

    return pastExercises$;
  }

  private addPastExerciseToFireStore(pastExercise: Exercise) {
    addDoc(collection(this.fireStore, 'pastExercises'), pastExercise);
  }
}
