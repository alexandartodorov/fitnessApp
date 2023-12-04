import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.less'],
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  public dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) private sort: MatSort;
  @ViewChild(MatPaginator) private paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  public ngOnInit(): void {
    this.trainingService
      .getCompletedOrCancelledExercises()
      .pipe(tap((v) => console.log(v)))
      .subscribe({
        next: (pastExercises) => (this.dataSource.data = pastExercises),
      });
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter(filterForm: HTMLInputElement): void {
    this.dataSource.filter = filterForm.value.trim().toLowerCase();
  }
}
