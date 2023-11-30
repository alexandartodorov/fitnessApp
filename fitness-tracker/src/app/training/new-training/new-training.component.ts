import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.less',
})
export class NewTrainingComponent {
  @Output() trainingStart = new EventEmitter<void>();

  public onStartTraining() {
    this.trainingStart.emit();
  }
}
