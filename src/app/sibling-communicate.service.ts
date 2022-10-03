import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiblingCommunicateService {
  private data = new BehaviorSubject('');
  currentData = this.data.asObservable();

  constructor() {}

  setData(data) {
    this.data.next(data);
  }
}
