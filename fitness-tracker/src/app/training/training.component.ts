import { Component } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.less',
})
export class TrainingComponent {
  public ongoingTraining: boolean = false;
}
