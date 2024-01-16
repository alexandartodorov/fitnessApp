import { Action, createAction, props } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_EXERCISES = '[Training] Set Available Exercises';
export const SET_FINISHED_EXERCISES = '[Training] Set Finished Exercises';
export const START_EXERCISE = '[Training] Start Exercise';
export const STOP_EXERCISE = '[Training] Stop Exercise';

export class SetAvailableExercises implements Action {
  public readonly type = SET_AVAILABLE_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

// action creator
// const action = createAction('my_action', props<{ value: number }>());
// console.log(action({ value: 42 }));

export class SetFinishedExercises implements Action {
  public readonly type = SET_FINISHED_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export class StartExercise implements Action {
  public readonly type = START_EXERCISE;

  constructor(public payload: string) {}
}

export class StopExercise implements Action {
  public readonly type = STOP_EXERCISE;
}

export type TrainingActions = SetAvailableExercises | SetFinishedExercises | StartExercise | StopExercise;
