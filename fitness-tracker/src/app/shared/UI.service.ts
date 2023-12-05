import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

export class UIService {
  public loadingState$ = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {}

  public showSnackbar(message: string, action: string, duration: number) {
    this.snackbar.open(message, action, { duration });
  }
}
