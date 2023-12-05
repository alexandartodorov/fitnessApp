import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.less'],
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  public displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  public dataSource = new MatTableDataSource<Exercise>();

  private completedOrCancelledExercisesSubscription: Subscription;

  @ViewChild(MatSort) private sort: MatSort;
  @ViewChild(MatPaginator) private paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  public ngOnInit(): void {
    this.completedOrCancelledExercisesSubscription = this.trainingService.completedOrCancelledExercises$.subscribe({
      next: (pastExercises) => (this.dataSource.data = pastExercises),
    });

    this.trainingService.initCompletedOrCancelledExercisesSubscription();
  }

  public ngOnDestroy(): void {
    if (this.completedOrCancelledExercisesSubscription) {
      this.completedOrCancelledExercisesSubscription.unsubscribe();
    }
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter(filterForm: HTMLInputElement): void {
    this.dataSource.filter = filterForm.value.trim().toLowerCase();
  }
}
