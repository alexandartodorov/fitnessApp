import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.less',
})
export class NewTrainingComponent implements OnInit {
  public exercises: Exercise[];

  constructor(private trainingService: TrainingService) {}

  public ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  public onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
