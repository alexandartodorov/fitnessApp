import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.less'],
})
export class TrainingComponent implements OnInit {
  public ongoingTraining$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) {}

  public ngOnInit(): void {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }
}
