import { Component } from '@angular/core';
import { TaskService } from '../shared/tasks.service';

import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  moment = moment;

  constructor(public taskService: TaskService) {}
}
