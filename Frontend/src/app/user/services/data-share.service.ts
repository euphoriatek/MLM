import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private userSource = new BehaviorSubject<boolean>(false);
  user$ = this.userSource.asObservable();

  updateProfileInfo(status: boolean): void {
    this.userSource.next(status);
  }
}
