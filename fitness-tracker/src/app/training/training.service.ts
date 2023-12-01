import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';

export class TrainingService {
  public exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  private ongoingExercise: Exercise;
  private exercises: Exercise[] = [];

  public getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  public startExercise(selectedId: string) {
    this.ongoingExercise = this.availableExercises.find((ex) => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.ongoingExercise });
  }

  public completeExercise(): void {
    this.exercises.push({
      ...this.ongoingExercise,
      date: new Date(),
      state: 'completed',
    });

    this.ongoingExercise = null;
    this.exerciseChanged.next(null);
  }

  public cancelExercise(progress: number): void {
    this.exercises.push({
      ...this.ongoingExercise,
      duration: this.ongoingExercise.duration * (progress / 100),
      calories: this.ongoingExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });

    this.ongoingExercise = null;
    this.exerciseChanged.next(null);
  }

  public getOngoingExercise(): Exercise {
    return { ...this.ongoingExercise };
  }

  public getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
