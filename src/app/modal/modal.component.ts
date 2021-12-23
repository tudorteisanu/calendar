import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../shared/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  form: FormGroup;
  moment = moment;
  model = '' as string;
  records = [] as Array<any>;
  items = {} as Array<any>;

  constructor(
    private taskService: TaskService,
    private dateService: DateService
  ) {
    this.form = new FormGroup({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
      expected: new FormControl(),
      type: new FormControl('', Validators.required),
      project: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (localStorage.getItem('records')) {
      this.items = JSON.parse(localStorage.getItem('records') as any) || {};
      this.records =
        this.items[this.dateService.date.value.format('YYYY-MM-DD')] || [];
    }
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    const task: Task = {
      ...this.form.value,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    };

    const response = await this.taskService.create(task);
    this.taskService.tasks.push(response as any);
    this.form.reset();

    this.taskService.showModal = false;
  }

  close() {
    this.taskService.close();
    this.dateService.date.next(this.dateService.date.value);
  }

  addRecord(): void {
    this.records.push(this.model);
    this.model = '';
    this.save();
  }

  removeRecord(index: any): void {
    this.records.splice(index, 1);
    this.model = '';
    this.save();
  }

  save() {
    this.items[this.dateService.date.value.format('YYYY-MM-DD')] = this.records;
    localStorage.setItem('records', JSON.stringify(this.items));
  }
}
