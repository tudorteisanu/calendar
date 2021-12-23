import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';

import * as moment from 'moment';

interface Day {
  value: moment.Moment;
  active: boolean;
  selected: boolean;
  disabled: boolean;
  records: Array<any>;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendar: Week[] = [];
  items = {} as any;

  loadData() {
    if (localStorage.getItem('records')) {
      this.items = JSON.parse(localStorage.getItem('records') as any) || {};
    }
  }

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this));
  }

  generate(now: moment.Moment) {
    this.loadData();
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');

    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');
            const records = this.items[value.format('YYYY-MM-DD')] || [];

            return {
              value,
              active,
              disabled,
              selected,
              records,
            };
          }),
      });
    }
    this.calendar = calendar;
  }

  select(day: any) {
    if (day.disabled) {
      return;
    }

    this.dateService.changeDate(day);
    this.loadData();
  }
}
