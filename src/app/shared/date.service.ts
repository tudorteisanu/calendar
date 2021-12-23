import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { TaskService } from './tasks.service';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  public date: BehaviorSubject<any> = new BehaviorSubject(moment());

  constructor(private taskService: TaskService) {}

  changeMonth(dir: number) {
    const value = this.date.value.add(dir, 'month');
    this.date.next(value);
  }

  changeDate(date: moment.Moment) {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month(),
    });

    this.date.next(value);
    this.taskService.showModal = true;
  }
}
